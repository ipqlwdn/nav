<template>
    <header v-if="componentVisible">
      <div class="logo-container">
        <div class="title-glass-wrapper">
          <h1 class="text-logo">
            LaoWang Nav
            <sup class="trademark">®</sup>
          </h1>
        </div>
      </div>
      <!-- PageTitle removed to prevent duplicate text -->
      <div class="header-right">
        <HeaderInfo class="header-weather" />
        <Nav v-if="navVisible" :links="pageInfo.navLinks" class="nav" />
      </div>
    </header>
</template>

<script>
import PageTitle from '@/components/PageStrcture/PageTitle.vue';
import HeaderInfo from '@/components/PageStrcture/HeaderInfo.vue';
import Nav from '@/components/PageStrcture/Nav.vue';
import { shouldBeVisible } from '@/utils/SectionHelpers';

export default {
  name: 'Header',
  components: {
    PageTitle,
    HeaderInfo,
    Nav,
  },
  props: {
    pageInfo: Object,
  },
  computed: {
    componentVisible() {
      return shouldBeVisible(this.$route.name);
    },
    visibleComponents() {
      return this.$store.getters.visibleComponents;
    },
    titleVisible() {
      return this.visibleComponents.pageTitle;
    },
    navVisible() {
      return this.visibleComponents.navigation;
    },
  },
};
</script>

<style scoped lang="scss">

@import '@/styles/media-queries.scss';

  header {
    margin: 0;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    background: var(--background-darker);
    align-items: center;
    align-content: flex-start;
    @include phone {
      flex-direction: column-reverse;
    }
  }

  .logo-container {
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    @include phone {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .header-weather {
    flex-shrink: 0;
  }

  .title-glass-wrapper {
    position: relative;
    padding: 1.2rem 3rem;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.12) 0%, 
      rgba(255, 255, 255, 0.06) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 32px 0 rgba(0, 0, 0, 0.3),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.5) 50%, 
        transparent 100%);
    }

    &:hover {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.18) 0%, 
        rgba(255, 255, 255, 0.1) 100%);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 
        0 12px 48px 0 rgba(0, 0, 0, 0.4),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
      transform: translateY(-3px);
    }
  }

  .text-logo {
    position: relative;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, 
      var(--primary) 0%, 
      var(--heading-text-color) 50%,
      var(--primary) 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    animation: gradientShift 6s ease infinite;
    
    .trademark {
      position: absolute;
      top: 0.2rem;
      right: -1.2rem;
      font-size: 1.1rem;
      font-weight: 700;
      opacity: 0.9;
      background: var(--primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @include phone {
    .title-glass-wrapper {
      padding: 0.8rem 2rem;
    }
    
    .text-logo {
      font-size: 1.8rem;
      
      .trademark {
        font-size: 0.7rem;
        top: 0.2rem;
        right: -0.7rem;
      }
    }
  }
</style>
