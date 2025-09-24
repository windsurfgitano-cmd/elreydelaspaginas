export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string;
  metadata: any;
  uploadDate: string;
}

export interface OrderData {
  id: string;
  items: any[];
  total: number;
  timestamp: number;
  status: 'pending' | 'processing' | 'completed';
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export class FileManager {
  private static readonly STORAGE_KEY = 'stored_files';

  private static readonly ORDERS_KEY = 'customization_orders';

  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Guardar archivo en localStorage
  static async saveFile(file: File, metadata: any = {}): Promise<string> {
    try {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Convert file to base64
      const base64 = await this.fileToBase64(file);

      const storedFile: StoredFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64,
        metadata,
        uploadDate: new Date().toISOString(),
      };

      // Save to localStorage
      const existingFiles = this.getAllFiles();
      existingFiles[fileId] = storedFile;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingFiles));

      return fileId;
    } catch (error) {
      throw new Error('Failed to save file');
    }
  }

  // Obtener archivo por ID
  static getFile(fileId: string): StoredFile | null {
    try {
      const files = this.getAllFiles();
      return files[fileId] || null;
    } catch (error) {
      return null;
    }
  }

  // Obtener todos los archivos
  static getAllFiles(): Record<string, StoredFile> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch (error) {
      return {};
    }
  }

  // Eliminar archivo
  static deleteFile(fileId: string): boolean {
    try {
      const files = this.getAllFiles();
      delete files[fileId];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
      return true;
    } catch (error) {
      return false;
    }
  }

  // Limpiar archivos antiguos (más de 30 días)
  static cleanOldFiles(): number {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const files = this.getAllFiles();
    let deletedCount = 0;

    Object.values(files).forEach((file) => {
      const uploadDate = new Date(file.uploadDate).getTime();
      if (uploadDate < thirtyDaysAgo) {
        if (this.deleteFile(file.id)) {
          deletedCount += 1;
        }
      }
    });

    return deletedCount;
  }

  // Guardar pedido
  static saveOrder(orderData: OrderData): string {
    const orders = this.getAllOrders();
    orders.push(orderData);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    return orderData.id;
  }

  // Obtener todos los pedidos
  static getAllOrders(): OrderData[] {
    try {
      return JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
    } catch (error) {
      return [];
    }
  }

  // Obtener pedido por ID
  static getOrder(orderId: string): OrderData | null {
    const orders = this.getAllOrders();
    return orders.find((order) => order.id === orderId) || null;
  }

  // Actualizar estado del pedido
  static updateOrderStatus(
    orderId: string,
    status: OrderData['status'],
  ): boolean {
    try {
      const orders = this.getAllOrders();
      const orderIndex = orders.findIndex((order) => order.id === orderId);

      if (orderIndex !== -1 && orders[orderIndex]) {
        orders[orderIndex]!.status = status;
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  // Obtener estadísticas de almacenamiento
  static getStorageStats(): {
    totalFiles: number;
    totalSize: number;
    totalOrders: number;
    storageUsed: string;
  } {
    const files = this.getAllFiles();
    const orders = this.getAllOrders();
    const filesArray = Object.values(files);
    const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);

    // Calcular uso aproximado de localStorage
    let storageUsed = 0;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.STORAGE_KEY) || key.startsWith(this.ORDERS_KEY)) {
        storageUsed += localStorage[key].length;
      }
    });

    return {
      totalFiles: filesArray.length,
      totalSize,
      totalOrders: orders.length,
      storageUsed: this.formatBytes(storageUsed),
    };
  }

  // Formatear bytes a formato legible
  private static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  }

  // Exportar todos los datos (para backup)
  static exportAllData(): string {
    const files = this.getAllFiles();
    const orders = this.getAllOrders();
    const stats = this.getStorageStats();

    return JSON.stringify(
      {
        files,
        orders,
        stats,
        exportDate: new Date().toISOString(),
      },
      null,
      2,
    );
  }

  // Verificar integridad de datos
  static verifyDataIntegrity(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Verificar archivos
      const files = this.getAllFiles();
      Object.values(files).forEach((file) => {
        if (!file.id || !file.name || !file.data) {
          errors.push(`Archivo corrupto: ${file.name || 'Sin nombre'}`);
        }
        if (file.size > 10 * 1024 * 1024) {
          warnings.push(
            `Archivo muy grande: ${file.name} (${this.formatBytes(file.size)})`,
          );
        }
      });

      // Verificar pedidos
      const orders = this.getAllOrders();
      orders.forEach((order) => {
        if (!order.id || !order.items || !Array.isArray(order.items)) {
          errors.push(`Pedido corrupto: ${order.id || 'Sin ID'}`);
        }
      });
    } catch (error) {
      errors.push(`Error al verificar integridad: ${error}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
