<template>
    <li class="nav-item">
        <slot name="item" />
        <div class="dropdown-menu dropdown-menu-arrow">
            <slot name="dropdown-item" />
        </div>
    </li>
</template>
