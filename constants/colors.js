export const COLORS = {
    // Paleta principal de azules (de más claro a más oscuro)
    white: '#FFFFFF',
    lightestBlue: '#E8F5F7',  // Primer tono más claro
    lighterBlue: '#C5E4E8',   // Segundo tono
    lightBlue: '#9FD4DB',     // Tercer tono
    mediumBlue: '#7BC3CE',    // Cuarto tono
    blue: '#52B2C1',          // Quinto tono
    darkBlue: '#2AA1B4',      // Sexto tono más oscuro

    // Colores complementarios para la UI
    black: '#000000',
    gray: '#808080',
    lightGray: '#D3D3D3',
};

// Temas de la aplicación
export const THEME = {
    // Usando la nueva paleta como tema principal
    primary: COLORS.blue,
    secondary: COLORS.lightBlue,
    background: COLORS.white,
    surface: COLORS.lightestBlue,
    accent: COLORS.darkBlue,
    
    // Variantes para diferentes estados y elementos
    primaryLight: COLORS.lighterBlue,
    primaryDark: COLORS.darkBlue,
    
    // Colores de texto
    text: COLORS.black,
    textLight: COLORS.gray,
    textOnPrimary: COLORS.white,
    
    // Estados
    disabled: COLORS.lightGray,
    hover: COLORS.mediumBlue,
}; 