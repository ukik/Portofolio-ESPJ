<template>
    <div class="ml-auto d-flex order-lg-2">
        <div class="dropdown">
            <a href="#" class="nav-link pr-0" data-toggle="dropdown">
                    <span class="avatar avatar-blue">SA</span>
                    <span class="ml-2 d-none d-lg-block text-center">
                    <span>{{ $root.level }}</span>
                    <small class="text-gray d-block">{{ $root.username }} - <span style="font-weight: bold">{{ $root.bidang }}</span></small> {{ $root.year }}
                    </span>
                </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a class="dropdown-item" @click="jump({ name: 'login-user' })" href="#" onclick="return false;">
                    <span>Profil</span>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="onLogout()" href="#" onclick="return false;">Logout</a>
            </div>
        </div>
        <a  v-pointer        
            class="header-toggler d-lg-none ml-3 ml-lg-0"
            data-toggle="collapse"
            data-target="#headerMenuCollapse">
                <span class="header-toggler-icon"></span>
        </a>
    </div>
</template>
