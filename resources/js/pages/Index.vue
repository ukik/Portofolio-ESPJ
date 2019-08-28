<template>
    <div>
        <FullPageLoading v-if="$root.request_submit"/>

        <Welcome v-if="$root.welcome"/>

        <Cache v-else>
            <transition name="fade">
                <component v-if="!$root.offline" :is="$root.component" />
                <component v-else :is="$root.component" />
            </transition>
        </Cache>
    </div>
</template>
