<template>
    <div class="col-lg-3 ml-auto">
        <ul class="nav nav-tabs border-0 flex-column flex-lg-row justify-content-end">
            <li class="nav-item">
                <slot name="item" />
                <div class="dropdown-menu dropdown-menu-arrow">
                    <slot name="dropdown-item" />
                </div>
            </li>
        </ul>
    </div>
</template>
