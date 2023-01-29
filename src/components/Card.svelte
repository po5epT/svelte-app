<script lang="ts">
  import Tag from './Tag.svelte';
  import RandomImage from './RandomImage.svelte';
  import type { ICard } from '../types/card';
  import { colors } from "../config";

  export let card = {} as ICard;

  let tags: string[] = card.notes.split(',').map(tag => tag.trim());
</script>

<div class="card {$$props.class}">
  <RandomImage
    alt="{card.blend_name}"
    class="card__img"
  />

  <div class="card__content">
    <Tag tag="{card.intensifier}" class="card__tag" />

    <div class="card__origin">{card.origin}</div>
    <div class="card__title title">{card.blend_name}</div>
    <div class="card__variety">{card.variety}</div>

    <div class="card__tags">
      {#each tags as tag, i}
        <Tag {tag} color="{colors[i]}" class="cards__tag" />
      {/each}
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 500px;
    width: 100%;
    background: white;
    border-radius: 15px;
  }

  :global(.card__img) {
    border-radius: 15px 15px 0 0;
  }

  .card__content {
    padding: 2rem;
    overflow: hidden;
  }

  .card__origin {
    color: #808080;
  }

  .card__origin,
  .card__variety {
    margin-bottom: 1rem;
  }

  .card__title {
    margin-bottom: 0.5rem;
  }

  .card__variety {
    font-size: 1.25rem;
  }

  .card__tags {
    display: flex;
    padding: 1rem 0;
    overflow-x: auto;
  }

  :global(.cards__tag + .cards__tag) {
    margin-left: 0.5rem
  }

  :global(.tag.card__tag) {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.75);
    color: #444;
  }
</style>
