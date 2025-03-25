<template>
  <div
    class="stories-wrapper relative bg-white pt-8 md:pb-16 pb-8 mb-8 md:mb-16"
  >
    <div class="container">
      <CommonSectionsSectionHead :title="'stories'" />
    </div>
    <ClientOnly>
      <StorySlider />
    </ClientOnly>
  </div>
</template>

<style scoped>
.stories-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 128px;
  background: linear-gradient(
    90deg,
    #f7f8fa 0%,
    rgba(247, 248, 250, 0.7) 46.53%,
    rgba(247, 248, 250, 0) 100%
  );
  z-index: 2;
}
.stories-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 128px;
  background: linear-gradient(
    90deg,
    #f7f8fa 0%,
    rgba(247, 248, 250, 0.7) 46.53%,
    rgba(247, 248, 250, 0) 100%
  );
  z-index: 2;
}

.stories-wrapper::after {
  left: 0;
}

.stories-wrapper::before {
  right: 0;
  transform: rotate(180deg);
}
@media screen and (max-width: 768px) {
  .stories-wrapper::before,
  .stories-wrapper::after {
    display: none !important;
  }
}
</style>
