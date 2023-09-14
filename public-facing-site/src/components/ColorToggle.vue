<script setup>
import { Moon, Sun, SunMoon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue'
const theme = ref(localStorage.getItem('theme') || 'light')

onMounted(() => {
    if (theme.value === 'dark') {
        document.getElementsByClassName('button-sun')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('button-moon')[0].style.display = 'none';
    }
})

</script>

<template>
    <li class="nav-item dropdown" id = "picker">
            <button class="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme (light)">
                <div class = "button-sun"><Sun/></div><div class = "button-moon"><Moon/></div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
              <li>
                <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="light" aria-pressed="true" onclick="{document.getElementsByClassName('button-moon')[0].style.display = 'none';document.getElementsByClassName('button-sun')[0].style.display = 'block'}">
                  <Sun/>
                  Light
                  <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                </button>
              </li>
              <li>
                <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false" onclick="{document.getElementsByClassName('button-sun')[0].style.display = 'none';document.getElementsByClassName('button-moon')[0].style.display = 'block'}">
                  <Moon/>
                  Dark
                  <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                </button>
              </li>
              <li>
                <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false">
                  <SunMoon/>
                  Auto
                  <svg class="bi ms-auto d-none"><use href="#check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
</template>

<style scoped>
#picker{
    position:fixed;
    right: .5rem;
    top: .5rem;
    z-index: 9000;
    list-style-type: none;
}

@media screen and (max-width: 768px) {
    #picker{
        display:none;
    }
}

.button-moon, .button-sun{
    color:gray;
    transform: scale(.7) translateX(.5rem);
}

.dropdown-toggle::after{
    color:gray;
}
</style>