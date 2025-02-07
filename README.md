
---

# 🏥 CancerViz - Guía de Instalación y Ejecución  

CancerViz es una plataforma para visualizar datos médicos extraido de https://ngdc.cncb.ac.cn/cancerscem/browse. Este documento describe cómo configurarlo y ejecutarlo usando **Docker** o de manera local.  

---

## 🚀 Requisitos Previos  
Antes de comenzar, asegúrate de tener instalado en tu sistema:  

✅ **Node.js** (versión 18 o superior)  
✅ **Docker & Docker Compose** (opcional, si deseas ejecutar con Docker)  
✅ **Git** (para clonar el repositorio)  

---

# 📌 1️⃣ Configurar Supabase  
CancerViz usa **Supabase** como base de datos. Para obtener tu instancia:  

### 🔹 1.1 Crear una cuenta en Supabase  
1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta.  
2. Crea un nuevo proyecto.  
3. En la sección **Database**, copia la **URL de conexión**.  

Ejemplo de URL que obtendrás:  

```
postgresql://postgres:TUPASSWORD@db.spzhzuepsisgalawmaon.supabase.co:5432/postgres
```

Reemplaza `TUPASSWORD` con la contraseña generada.  

### 🔹 1.2 Configurar variables de entorno  
Crea un archivo **`.env`** en la raíz del proyecto y agrega:  

```env
DATABASE_URL=postgresql://postgres:TUPASSWORD@db.spzhzuepsisgalawmaon.supabase.co:5432/postgres
NODE_ENV=development
PORT=3000
```

---

# ⚡ 2️⃣ Ejecutar CancerViz de forma Local (Sin Docker)  
Si deseas ejecutar CancerViz directamente en tu máquina:  

### 🔹 2.1 Clonar el repositorio  
```bash
git clone https://github.com/tu-usuario/cancerviz.git
cd cancerviz
```

### 🔹 2.2 Instalar dependencias  
```bash
npm install
```

### 🔹 2.3 Ejecutar el proyecto  
```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`.  

---

# 🐳 3️⃣ Ejecutar CancerViz con Docker  
Si prefieres usar Docker:  

### 🔹 3.1 Clonar el repositorio  
```bash
git clone https://github.com/tu-usuario/cancerviz.git
cd cancerviz
```

### 🔹 3.2 Construir y levantar los contenedores  
```bash
docker-compose -f docker-compose.local.yml up --build -d
```

### 🔹 3.3 Ver logs de ejecución  
```bash
docker-compose -f docker-compose.local.yml logs -f
```

Si todo está bien, CancerViz estará corriendo en `http://localhost:3000`.  

---

# 🔄 4️⃣ Actualizar el Contenedor  
Si hiciste cambios en el código y necesitas actualizar el contenedor:  

```bash
docker-compose -f docker-compose.local.yml up --build -d
```

---
# ✅ Llenar la bd con el semillero, haciendo un post.
```bash
http://localhost:3000/cancerviz/seed
```
---

# ✅ Conclusión  
Ahora tienes **CancerViz** funcionando en tu máquina 🎉. Puedes elegir entre ejecutarlo **localmente** o con **Docker**.  

Si tienes problemas, revisa la configuración de Supabase y las variables de entorno.  

🚀 **¡Feliz desarrollo!** 😃  

---
