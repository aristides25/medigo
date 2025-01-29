# MediGo App

Aplicación móvil para la plataforma MediGo, un servicio integral de salud en Venezuela.

## Descripción

MediGo es una plataforma que conecta proveedores de servicios médicos con pacientes, facilitando:

* Citas médicas
* Servicios de farmacia
* Expedientes médicos digitales
* Telemedicina
* Servicios de emergencia
* Servicios de enfermería

## Tecnologías Utilizadas

* React Native 0.76.6
* Expo SDK 52
* React 18.3.1
* React Navigation 6
* React Native Elements
* React Native Maps 1.18.0
* Expo Location
* Expo Image Picker
* Expo Document Picker

## Requisitos Previos

* Node.js (versión recomendada: 18.x o superior)
* npm o yarn
* Expo Go (última versión)
* Android Studio (para desarrollo en Android)
* Xcode (para desarrollo en iOS, solo Mac)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/aristides25/medigo.git
cd medigo
```

2. Instalar dependencias:
```bash
npm install --legacy-peer-deps
```

3. Iniciar la aplicación:
```bash
npx expo start
```

## Estructura del Proyecto

```
medigo/
├── assets/            # Recursos estáticos
├── components/        # Componentes reutilizables
├── constants/         # Constantes y configuración
├── context/          # Contextos de React
├── navigation/       # Configuración de navegación
├── screens/          # Pantallas de la aplicación
└── App.js           # Punto de entrada principal
```

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run android`: Inicia la aplicación en Android
- `npm run ios`: Inicia la aplicación en iOS
- `npm run web`: Inicia la aplicación en web
- `npm run doctor`: Verifica la configuración del proyecto

## Versiones de Dependencias

Todas las dependencias están configuradas para ser compatibles con Expo SDK 52. Las principales son:

- react: 18.3.1
- react-native: 0.76.6
- expo: ~52.0.0
- @react-navigation/native: 6.1.9
- react-native-maps: 1.18.0
- react-native-reanimated: ~3.16.1
- react-native-safe-area-context: 4.12.0
- react-native-screens: ~4.4.0

## Solución de Problemas

Si encuentras problemas durante la instalación o ejecución:

1. Limpia la caché:
```bash
npm cache clean --force
```

2. Elimina node_modules y reinstala:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

3. Reinicia con caché limpia:
```bash
npx expo start --clear
```

## Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles 