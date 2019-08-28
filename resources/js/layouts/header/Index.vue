<template>
    <div class="header bg-white" id="header">
        <div class="container">
            <div class="navbar p-0">
                <Logo />
                <MenuProfile v-if="$root.auth" />
            </div>    
        </div>
    </div>
</template>

<script>
import Logo from "./logo";
import MenuProfile from "./menuprofile";

export default {
    components: {
        Logo,
        MenuProfile,
    }
}
</script>

