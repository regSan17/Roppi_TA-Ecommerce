import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // 🔴 Usamos NavLink nativo

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  // El único estado que necesitamos es saber si el acordeón de "Catálogo" está abierto
  const [expandedSections, setExpandedSections] = useState<string[]>(['catalog']);

  const menuItems = [
    { id: 'general', label: 'General', icon: LayoutDashboard, path: '/dashboard' },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: Boxes,
      children: [
        { id: 'productos', label: 'Productos', path: '/products' },
        { id: 'descuentos', label: 'Descuentos', path: '/discounts' },
        { id: 'categorias', label: 'Categorías', path: '/categories' },
      ],
    },
    { id: 'orders', label: 'Ordenes', icon: ShoppingCart, path: '/orders' },
    { id: 'quotes', label: 'Cotizaciones', icon: FileText, path: '/quotes' },
    { id: 'clients', label: 'Clientes', icon: Users, path: '/clients' },
    { id: 'reports', label: 'Reportes', icon: BarChart3, path: '/reports' },
  ];

  const bottomItems = [
    { id: 'support', label: 'Support', icon: HelpCircle, path: '/support' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside
      className={`h-screen bg-white border-r border-border flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="font-semibold text-lg">Roppi</h2>
            <p className="text-xs text-muted-foreground">Gestión de Negocios</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedSections.includes(item.id);
            const hasChildren = item.children && item.children.length > 0;

            // CASO A: Tiene hijos (Como Catálogo). Solo abre/cierra el acordeón, no navega.
            if (hasChildren) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent text-foreground transition-colors"
                  >
                    <Icon size={20} />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm flex-1 text-left">{item.label}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </>
                    )}
                  </button>

                  {/* Render de los Hijos */}
                  {isExpanded && !isCollapsed && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.id}
                          to={child.path}
                          className={({ isActive }) =>
                            `w-full block text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'hover:bg-accent text-foreground'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // CASO B: Enlaces directos sin hijos (General, Ordenes, etc.)
            return (
              <NavLink
                key={item.id}
                to={item.path || '#'}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'hover:bg-accent text-foreground'
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="p-3 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-foreground'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}