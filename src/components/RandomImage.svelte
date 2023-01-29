<script lang="ts">
  import { onMount } from "svelte";
  import { IMG_URL } from "../config";

  export let alt = '';
  export let placeholder = 'Loading image...';

  let src = '';
  const updateSrc = (img) => {
    src = img.src;
  };

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Couldn't load an image: ${url}`));
      img.src = url;
    });
  }

  onMount(() => {
    loadImage(IMG_URL)
      .then(updateSrc)
      .catch(console.log);
  });
</script>

<div class="img-placeholder {$$props.class}">
  {#if src}
    <img
      class="img img_animated"
      {src}
      {alt}
    >
  {/if}

  {placeholder}
</div>

<style>
  .img-placeholder {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background: #cccccc;
    color: #7e7f7f;
    overflow: hidden;
  }

  .img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    object-fit: cover;
  }

  .img_animated {
    animation: 0.5s forwards scaling;
  }

  @keyframes scaling {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
