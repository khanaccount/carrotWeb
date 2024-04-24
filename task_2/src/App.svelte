<script lang="ts">
    import { onMount } from "svelte";

    let apiData: any = [];
    let currencyLeft = "RUB";
    let currencyRight = "USD";
    let conversionLeft = 0;
    let conversionRight = 0;

    onMount(async () => {
        const response = await fetch(
            "https://v6.exchangerate-api.com/v6/7a9534cae749e3d8f310643d/latest/RUB"
        );
        apiData = await response.json();
        convertFromLeft();
        convertFromRight();
    });

    function convertFromLeft() {
        conversionRight = parseFloat(
            (
                (conversionLeft / apiData.conversion_rates[currencyLeft]) *
                apiData.conversion_rates[currencyRight]
            ).toFixed(2)
        );
    }

    function convertFromRight() {
        conversionLeft = parseFloat(
            (
                (conversionRight / apiData.conversion_rates[currencyRight]) *
                apiData.conversion_rates[currencyLeft]
            ).toFixed(2)
        );
    }
</script>

<main>
    <h1>Конвертация валют на основе Api</h1>
    <div class="main">
        <div class="moneyBlock">
            <p>У меня есть</p>
            <input
                min="0"
                type="number"
                on:change={convertFromLeft}
                bind:value={conversionLeft}
            />
            <select bind:value={currencyLeft} on:change={convertFromRight}>
                {#each Object.keys(apiData.conversion_rates || {}) as currencyLeft}
                    <option value={currencyLeft}>{currencyLeft}</option>
                {/each}
            </select>
        </div>

        <div class="moneyBlock">
            <p>Хочу купить</p>
            <input
                min="0"
                type="number"
                on:change={convertFromRight}
                bind:value={conversionRight}
            />
            <select bind:value={currencyRight} on:change={convertFromLeft}>
                {#each Object.keys(apiData.conversion_rates || {}) as currencyRight}
                    <option value={currencyRight}>{currencyRight}</option>
                {/each}
            </select>
        </div>
    </div>
</main>

<style>
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .moneyBlock p {
        color: rgb(255, 255, 255);
        background-color: rgb(110, 11, 223);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        font-weight: 700;
        height: 50px;
        margin: 0;
    }
    .moneyBlock input {
        background-color: whitesmoke;
        outline: none;
        border: none;
        color: black;
        width: 600px;
        height: 50px;
        text-align: center;
        padding-top: 10px;
        font-size: 40px;
    }
    .moneyBlock select {
        background-color: whitesmoke;
        outline: none;
        border: none;
        color: black;
        height: 50px;
        width: 600px;
        text-align: center;
        margin-top: 10px;
        font-size: 40px;

        transition: max-height 0.5s ease; /* Анимация высоты */
    }

    .moneyBlock:not(:last-child) {
        margin-right: 300px;
    }
</style>
