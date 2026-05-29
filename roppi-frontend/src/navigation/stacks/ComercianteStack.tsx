import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { ProductsScreen} from '../../views/comerciante/ProductsScreen'// Asegúrate de apuntar bien a la ruta del archivo
import { ProductFormScreen} from '../../views/comerciante/ProductFormScreen'
import { DiscountsScreen} from '../../views/comerciante/DiscountsScreen'
import { DiscountFormScreen} from '../../views/comerciante/DiscountFormScreen'

export const ComercianteStack = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Inyectamos el nuevo Sidebar con el comportamiento limpio */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Contenedor principal de pantallas */}
      <main style={{ flex: 1, padding: '40px', background: '#f8fafc' }}>
        <Routes>
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/products/new" element={<ProductFormScreen />} />
          <Route path="/products/edit/:id" element={<ProductFormScreen />} />
          
          <Route path="/discounts" element={<DiscountsScreen />} />
          <Route path="/discounts/new" element={<DiscountFormScreen />} />
          {/* Añadido el / inicial corregido que faltaba en el dummy */}
          <Route path="/discounts/edit/:id" element={<DiscountFormScreen />} />

          {/* Rutas comodín temporales por si hacen clic en módulos no desarrollados aún */}
          <Route path="/dashboard" element={<div>📊 Pantalla de Dashboard General (Próximamente)</div>} />
          <Route path="/categories" element={<div>🗂️ Gestión de Categorías (Próximamente)</div>} />

          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="*" element={<div>Ruta no encontrada o cargando...</div>} />
        </Routes>
      </main>
    </div>
  );
};
export default ComercianteStack;