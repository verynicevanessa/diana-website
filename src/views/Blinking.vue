<script setup>
import CablesPatch from '@/components/CablesPatch.vue' //imported in root for possible use in other views
</script>

<template>
    <div>
        <CablesPatch patchDir="/patch_blink/" :patchOptions="{ glCanvasResizeToWindow: true }"/>
    </div>
</template>

<script>
export default {
    
}
</script>
<style>
</style>