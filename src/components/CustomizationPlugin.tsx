import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import type { OrderData } from '../utils/FileManager';
import { FileManager } from '../utils/FileManager';

interface CustomizationItem {
  id: string;
  name: string;
  price: number;
  image?: File;
  imageUrl?: string;
  description: string;
  timestamp: number;
}

interface CartItem extends CustomizationItem {
  quantity: number;
}

const CustomizationPlugin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentItem, setCurrentItem] = useState<CustomizationItem>({
    id: '',
    name: '',
    price: 0,
    description: '',
    timestamp: Date.now(),
  });
  const [selectedService, setSelectedService] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const services = [
    { id: 'edit-photo', name: 'Edición de Foto', price: 4990 },
    { id: 'pack-5-photos', name: 'Pack 5 Fotos', price: 19990 },
    { id: 'photo-video', name: 'Foto + Video', price: 49990 },
    { id: 'complete-pack', name: 'Pack Completo', price: 79990 },
  ];

  // Guardar archivo usando FileManager
  const saveFileToStorage = async (file: File, itemId: string) => {
    try {
      await FileManager.saveFile(file, itemId);
      toast.success('Archivo guardado correctamente');
    } catch (error) {
      toast.error('Error al guardar el archivo');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona solo archivos de imagen');
        return;
      }

      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('El archivo es muy grande. Máximo 10MB');
        return;
      }

      const itemId = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const imageUrl = URL.createObjectURL(file);

      setCurrentItem((prev) => ({
        ...prev,
        id: itemId,
        image: file,
        imageUrl,
      }));

      // Guardar archivo inmediatamente
      saveFileToStorage(file, itemId);

      toast.success('Imagen cargada correctamente');
    }
  };

  const addToCart = () => {
    if (!selectedService || !currentItem.image) {
      toast.error('Selecciona un servicio y carga una imagen');
      return;
    }

    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    const cartItem: CartItem = {
      ...currentItem,
      name: service.name,
      price: service.price,
      quantity: 1,
      description:
        currentItem.description || `Personalización de ${service.name}`,
    };

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === cartItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, cartItem];
    });

    // Guardar carrito en localStorage
    const updatedCart = [...cart, cartItem];
    localStorage.setItem('customization_cart', JSON.stringify(updatedCart));

    toast.success('Agregado al carrito');

    // Resetear formulario
    setCurrentItem({
      id: '',
      name: '',
      price: 0,
      description: '',
      timestamp: Date.now(),
    });
    setSelectedService('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem('customization_cart', JSON.stringify(updatedCart));
    toast.success('Eliminado del carrito');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    try {
      // Crear pedido en el sistema
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const orderData: OrderData = {
        id: orderId,
        items: cart,
        total: getTotalPrice(),
        timestamp: Date.now(),
        status: 'pending',
      };

      // Guardar pedido
      FileManager.saveOrder(orderData);

      // Crear mensaje para WhatsApp con detalles del pedido
      const orderDetails = cart
        .map(
          (item) =>
            `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toLocaleString()}\n  Archivo: ${item.image?.name || 'Sin archivo'}\n  ID: ${item.id}`,
        )
        .join('\n\n');

      const total = getTotalPrice();
      const message = `🎨 PEDIDO DE PERSONALIZACIÓN\n\n📋 ID PEDIDO: ${orderId}\n\n${orderDetails}\n\n💰 TOTAL: $${total.toLocaleString()}\n\n📝 Nota: Los archivos están guardados de forma segura con los IDs mencionados arriba.\n\n⚠️ IMPORTANTE: Guarda este ID de pedido para seguimiento: ${orderId}`;

      const whatsappUrl = `https://wa.me/56981330217?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Limpiar carrito después del pedido
      setCart([]);
      localStorage.removeItem('customization_cart');

      toast.success(`Pedido ${orderId} creado. Redirigiendo a WhatsApp...`);
    } catch (error) {
      toast.error('Error al procesar el pedido');
    }
  };

  // Cargar carrito desde localStorage al iniciar
  React.useEffect(() => {
    const savedCart = localStorage.getItem('customization_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <>
      {/* Botón flotante de personalización */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cart.length}
          </span>
        )}
      </motion.button>

      {/* Modal de personalización */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    🎨 Personalización de Servicios
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="size-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Panel de personalización */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Crear Pedido Personalizado
                    </h3>

                    {/* Selección de servicio */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Selecciona el servicio
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Selecciona un servicio...</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - ${service.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Carga de imagen */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Sube tu imagen
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Formatos: JPG, PNG, GIF. Máximo 10MB
                      </p>
                    </div>

                    {/* Preview de imagen */}
                    {currentItem.imageUrl && (
                      <div className="rounded-lg border p-4">
                        <p className="mb-2 text-sm font-medium text-gray-700">
                          Vista previa:
                        </p>
                        <img
                          src={currentItem.imageUrl}
                          alt="Preview"
                          className="h-48 w-full rounded-lg object-cover"
                        />
                      </div>
                    )}

                    {/* Descripción */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Descripción (opcional)
                      </label>
                      <textarea
                        value={currentItem.description}
                        onChange={(e) =>
                          setCurrentItem((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe qué quieres que hagamos con tu imagen..."
                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                    </div>

                    <button
                      onClick={addToCart}
                      disabled={!selectedService || !currentItem.image}
                      className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Agregar al Carrito
                    </button>
                  </div>

                  {/* Panel del carrito */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Carrito de Compras
                    </h3>

                    {cart.length === 0 ? (
                      <p className="py-8 text-center text-gray-500">
                        El carrito está vacío
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-lg border bg-gray-50 p-4"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-600">
                                  Cantidad: {item.quantity} × $
                                  {item.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Archivo: {item.image?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  ID: {item.id}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  $
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg
                                    className="size-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span>${getTotalPrice().toLocaleString()}</span>
                          </div>
                          <button
                            onClick={handleCheckout}
                            className="mt-4 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-green-700"
                          >
                            💬 Finalizar Pedido por WhatsApp
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomizationPlugin;
