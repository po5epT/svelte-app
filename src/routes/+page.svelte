<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Card from '../components/Card.svelte';
  import Button from '../components/Button.svelte';
  import type { ICard } from "../types/card";
  import { COFFEE_URL, DEFAULT_TIMER } from "../config";
  import { useTimer } from "../composables/use-timer";

  let cards: ICard[] = [];
  const updateCards = (card: ICard) => {
    cards = [...cards, card];
  }

  let loading = false;
  const setLoader = () => {
    loading = false;
  }

  let hint: HTMLDivElement;
  let { elapsedTime, restart, reset } = useTimer(DEFAULT_TIMER, loadCard);

  async function loadCoffee() {
    try {
      const response = await fetch(COFFEE_URL);

      if (response.ok === false) {
        console.log('Bad request');
        return;
      }

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  function loadCard() {
    restart();
    loading = true;

    loadCoffee()
      .then(updateCards)
      .then(scrollToHint)
      .catch(console.log)
      .finally(setLoader);
  }

  function scrollToHint() {
    if (!hint)
      return;

    window.scrollTo({
      top: hint.offsetTop,
      behavior: 'smooth'
    });
  }

  onMount(loadCard);
  onDestroy(reset);
</script>

<main class="wrapper">
  <div class="cards">
    {#each cards as card}
      <Card {card} class="cards__card" />
    {/each}

    {#if cards.length}
      <Button on:click={loadCard} class="cards__loader">
        Load more
      </Button>

      <div class="cards__hint" bind:this={hint}>
        Autoload in {$elapsedTime} seconds.
      </div>
    {/if}
  </div>
</main>

<style>
  .wrapper {
    padding: 1rem;
  }

  .cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cards__hint {
    font-size: 0.75rem;
    color: #808080;
  }

  :global(.cards__card + .cards__card) {
    margin-top: 2rem;
  }

  :global(.cards__loader) {
    margin: 2rem 0 0.5rem 0;
  }
</style>
