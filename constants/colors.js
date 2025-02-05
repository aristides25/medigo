// Paleta principal de MediGo
export const COLORS = {
    // Paleta principal de azules (de más claro a más oscuro)
    white: '#FFFFFF',
    lightestBlue: '#E8F5F7',  // Fondo de la aplicación
    lighterBlue: '#C5E4E8',   // Bordes y elementos secundarios
    lightBlue: '#9FD4DB',     // Iconos y elementos interactivos
    mediumBlue: '#7BC3CE',    // Estados hover y elementos activos
    blue: '#52B2C1',          // Color principal, botones y acciones
    darkBlue: '#2AA1B4',      // Textos importantes y énfasis

    // Colores de texto y UI
    black: '#2A2A2A',         // Textos principales
    gray: '#808080',          // Textos secundarios
    lightGray: '#D3D3D3',     // Bordes y elementos deshabilitados
    
    // Estados y acciones
    success: '#4CAF50',       // Éxito y confirmaciones
    warning: '#FFC107',       // Advertencias
    error: '#FF5252',         // Errores y alertas
    info: '#2196F3',          // Información
    
    // Transparencias comunes
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadowLight: 'rgba(42, 161, 180, 0.1)',
    shadowMedium: 'rgba(42, 161, 180, 0.2)',
    shadowDark: 'rgba(42, 161, 180, 0.3)',
};

// Tema de la aplicación
export const THEME = {
    // Colores base
    primary: COLORS.blue,
    secondary: COLORS.lightBlue,
    background: COLORS.lightestBlue,
    surface: COLORS.white,
    
    // Textos
    textPrimary: COLORS.black,
    textSecondary: COLORS.gray,
    textLight: COLORS.white,
    
    // Estados
    active: COLORS.mediumBlue,
    inactive: COLORS.lightGray,
    disabled: COLORS.lightGray,
    
    // Elementos de UI
    card: {
        background: COLORS.white,
        border: COLORS.lighterBlue,
        shadow: COLORS.shadowLight,
    },
    
    button: {
        primary: {
            background: COLORS.blue,
            text: COLORS.white,
            border: COLORS.darkBlue,
        },
        secondary: {
            background: COLORS.lightestBlue,
            text: COLORS.blue,
            border: COLORS.lightBlue,
        },
        disabled: {
            background: COLORS.lightGray,
            text: COLORS.gray,
            border: COLORS.lightGray,
        }
    },
    
    input: {
        background: COLORS.white,
        border: COLORS.lighterBlue,
        text: COLORS.black,
        placeholder: COLORS.gray,
    },
    
    icon: {
        primary: COLORS.blue,
        secondary: COLORS.lightBlue,
        inactive: COLORS.gray,
    },
    
    // Efectos
    shadow: {
        light: {
            shadowColor: COLORS.darkBlue,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        medium: {
            shadowColor: COLORS.darkBlue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
        },
        dark: {
            shadowColor: COLORS.darkBlue,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 10,
        }
    },
    
    // Estados de la aplicación
    status: {
        success: COLORS.success,
        warning: COLORS.warning,
        error: COLORS.error,
        info: COLORS.info,
    }
}; 