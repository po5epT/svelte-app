<script lang="ts">
  import type { Color, ColorClass } from "../types/colors";

  export let tag: string;
  export let color = "" as Color;

  const colorClass = (color ? `tag_${color}` : "") as ColorClass<"tag", Color>;
</script>

<div class="tag {colorClass} {$$props.class}">{tag}</div>

<style>
  .tag {
    padding: 0.25rem 1rem;
    border-radius: 5px;
    font-weight: 500;
    font-size: 1.25rem;
    white-space: nowrap;
    color: white;
  }

  .tag_orange {
    background: #f39c12;
  }

  .tag_turquoise {
    background: #1abc9c;
  }

  .tag_pomegranate {
    background: #c0392b;
  }

  .tag_amethyst {
    background: #9b59b6;
  }

  .tag_river {
    background: #3498db;
  }
</style>
