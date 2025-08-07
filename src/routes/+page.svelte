<script lang="ts">
    import { onMount } from "svelte";
    import { reshape, copyRec, add_webgl } from "$lib/index";

    import * as useragent from 'useragent-ng'


    let glCanvas: undefined | HTMLCanvasElement = $state(undefined);
    let canvasFingerprint: undefined | HTMLCanvasElement = $state(undefined);
    let downloadLink: string = $state("");

    onMount(async() => {
        const ctx = canvasFingerprint!.getContext("2d")!;

        ctx.font = "30px gnizerjgnezgbuerb";
        ctx.fillText("Yxskaftbud, ge vår WC-zonmö IQ-hjälp", 10, 40);

        ctx.font = "30px Arial";
        ctx.fillText("Gud hjälpe Zorns mö qvickt fåbyxa", 10, 80);

        ctx.fillText("👨‍💻", 800, 40);

        ctx.beginPath();

        // Define a triangle
        ctx.moveTo(600, 20);
        ctx.lineTo(780, 100);
        ctx.lineTo(600, 100);
        ctx.lineTo(600, 20);

        ctx.fillStyle = "rgb(255,0,0,0.75)";
        ctx.fill();

        ctx.fillStyle = "rgb(255,255,0,0.5)";
        ctx.beginPath();
        ctx.arc(620, 60, 60, 0, 2 * Math.PI);
        ctx.fill();

        const myImageData = ctx.getImageData(0, 0, 1200, 120);

        let wglExts = add_webgl(glCanvas);

        let canvasRender = reshape(myImageData);
        let navigator = copyRec(window.navigator);

        var agent = useragent.parse(navigator.appVersion);
        navigator.appVersion = agent.toJSON()


        var agent = useragent.parse(navigator.userAgent);
        navigator.userAgent = agent.toJSON()

        let data = { wglExts, navigator, canvasRender };

        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });

        downloadLink = URL.createObjectURL(blob);
    });
    
</script>


<main class="grid place-items-center w-dvw h-dvh">

    {#if downloadLink}
        <a
            href={downloadLink}
            download="fingerprint.json"
            class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >Download My Fingerprint
        </a>
        {:else}
        <canvas bind:this={glCanvas} width="120" height="32"></canvas>
        
        <canvas bind:this={canvasFingerprint} width="1200" height="120"></canvas>
    {/if}

</main>