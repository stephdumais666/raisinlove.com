<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface ImageState {
  url: string;
  loaded: boolean;
}

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

const images = ref<ImageState[]>([]);
const selectedImage = ref<string | null>(null);
const isFullscreen = ref(false);

const socialLinks: SocialLink[] = [
  {
    icon: 'instagram',
    url: 'https://www.instagram.com/bloodygorecomix/',
    label: 'Instagram'
  },
  {
    icon: 'facebook',
    url: 'https://www.facebook.com/bloodygorecomix',
    label: 'Twitter'
  },
  {
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/stephanedumais/',
    label: 'LinkedIn'
  }
];

// Function to load images from the assets directory
const loadImages = async () => {
  const imageModules = import.meta.glob('../assets/*.{jpg,jpeg,png,gif,webp,svg}', { eager: true });
  images.value = Object.values(imageModules).map((module: any) => ({
    url: module.default,
    loaded: false
  }));

  // Preload all images
  images.value.forEach((image, index) => {
    const img = new Image();
    img.onload = () => {
      images.value[index].loaded = true;
    };
    img.src = image.url;
  });
};

const openFullscreen = (image: string) => {
  selectedImage.value = image;
  isFullscreen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
  selectedImage.value = null;
  isFullscreen.value = false;
  document.body.style.overflow = '';
};

// Close fullscreen view when pressing Escape
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    closeFullscreen();
  }
};

onMounted(() => {
  loadImages();
  window.addEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="gallery-container">
    <header class="sticky-header">
      <div class="header-content">
        <div class="header-title">
          <h1>RAISINLOVE.COM - STEPH DUMAIS</h1>
          <!--p>{{ images.length }} images found</p-->
        </div>
        <div class="social-links">
          <a v-for="link in socialLinks"
             :key="link.icon"
             :href="link.url"
             target="_blank"
             rel="noopener noreferrer"
             :title="link.label"
             class="social-link">
            <font-awesome-icon :icon="['fab', link.icon]" />
          </a>
        </div>
      </div>
    </header>
    
    <div class="image-grid">
      <div v-for="(image, index) in images" 
           :key="index" 
           class="image-item"
           @click="() => openFullscreen(image.url)">
        <div v-if="!image.loaded" class="image-placeholder pulse"></div>
        <img 
          :src="image.url" 
          :alt="`Image ${index + 1}`" 
          loading="lazy"
          :class="{ 'image-loaded': image.loaded }"
        />
      </div>
    </div>

    <!-- Fullscreen Image View -->
    <div v-if="isFullscreen && selectedImage" class="fullscreen-view" @click="closeFullscreen">
      <button class="close-button" @click.stop="closeFullscreen">×</button>
      <img 
        :src="selectedImage" 
        alt="Fullscreen image"
        @click.stop
        class="fullscreen-image" 
      />
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.sticky-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem;
  z-index: 100;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: none;
  width:100%;
  margin: 0 auto;
}

.header-title {
  flex: 1;
}

.header-title h1 {
  margin: 0;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: inherit;
  font-size: 1.5rem;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.7;
}

.social-link:hover {
  transform: translateY(-2px);
  opacity: 1;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.image-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
}

.image-item:hover {
  transform: scale(1.02);
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item img.image-loaded {
  opacity: 1;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}

.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.fullscreen-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-image {
  max-width: 95%;
  max-height: 95vh;
  object-fit: contain;
  user-select: none;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 1001;
}

.close-button:hover {
  opacity: 0.8;
}

@media (prefers-color-scheme: dark) {
  .sticky-header {
    background: rgba(36, 36, 36, 0.9);
    border-bottom: 1px solid #333;
  }

  .image-placeholder {
    background-color: #2a2a2a;
  }

  @keyframes pulse {
    0% {
      background-color: #2a2a2a;
    }
    50% {
      background-color: #333333;
    }
    100% {
      background-color: #2a2a2a;
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .social-links {
    justify-content: center;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .header-title h1 {
    font-size: 1.5rem;
  }
}
</style>