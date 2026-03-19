import { UserAvatar } from "../../ui/user-avatar.js";

export class AppTopbar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Dashboard";

    this.innerHTML = `
      <header class="px-6 py-3 border-b border-main-200    text-gray-900">
      <div class="flex items-center justify-between">
        
        <!-- Title -->
        <h2 class="text-xl font-semibold">${title}</h2>

        <!-- Icons -->
        <div class="flex items-center gap-4 text-lg">
        <div class="relative">
          <!-- Notifications Icon -->
          <button
          data-notif-toggle
          class="relative p-2 rounded-full hover:scale-110 transition-transform cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-main-300 hover:border hover:border-main-400"
          aria-haspopup="true"
          aria-expanded="false"
          >
          <i class="bi bi-bell"></i>
          <span class="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">3</span>
          </button>
          <div
          data-notif-menu
          class="hidden absolute right-0 mt-1 w-72 rounded-2xl border border-main-200 bg-white p-4 text-sm text-gray-900 shadow-xl z-10"
          >
          <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Notifications</span>
            <button class="text-xs font-medium text-main-600 hover:underline">Mark all read</button>
          </div>
          <div class="space-y-3">
            <div class="flex items-start gap-3 rounded-xl bg-main-100 p-3">
            <i class="bi bi-check-circle text-main-600"></i>
            <div>
              <p class="text-sm font-semibold">Deployment completed</p>
              <p class="text-xs text-gray-500">Your dashboard update is live.</p>
            </div>
            </div>
            <div class="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
            <i class="bi bi-person-plus text-main-600"></i>
            <div>
              <p class="text-sm font-semibold">New client invite</p>
              <p class="text-xs text-gray-500">Asha joined your workspace.</p>
            </div>
            </div>
            <div class="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
            <i class="bi bi-graph-up text-main-600"></i>
            <div>
              <p class="text-sm font-semibold">Weekly report ready</p>
              <p class="text-xs text-gray-500">Review insights from this week.</p>
            </div>
            </div>
          </div>
          <a
            href="#"
            class="mt-4 inline-flex w-full items-center justify-center rounded-full border border-main-200 bg-main-100 px-4 py-2 text-xs font-semibold text-main-600 hover:bg-main-200"
          >
            View all notifications
          </a>
          </div>
        </div>

        <div class="relative">
          <user-avatar
          data-profile-toggle
          src="https://avatars.githubusercontent.com/u/153155657?v=4"
          alt="Admin User"
          initials="AU"
          size="40"
          status="online"
          rounded="full"
          class="hover:scale-110 transition-transform cursor-pointer"
          ></user-avatar>

          <div
          data-profile-menu
          class="hidden absolute right-0 mt-1 w-56 rounded-2xl border border-main-200 bg-white p-3 text-sm text-gray-900 shadow-xl z-10"
          >
          <div class="mb-2 flex flex-col items-center gap-2 rounded-xl bg-main-100 p-3 text-center">
            <user-avatar
              src="https://avatars.githubusercontent.com/u/153155657?v=4"
              alt="Admin User"
              initials="AU"
              size="50"
              status="online"
              rounded="full"
            ></user-avatar>
            <div class="flex flex-col items-center">
              <p class="text-sm font-semibold">Admin User</p>
              <p class="text-xs text-gray-500">Project Manager</p>
            </div>
          </div>
          <a href="#" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-main-100">
            <i class="bi bi-person"></i>
            View profile
          </a>
          <a href="#" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-main-100">
            <i class="bi bi-gear"></i>
            Settings
          </a>
          <div class="my-2 h-px bg-main-200"></div>
          <a href="/auth/login" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-main-600 hover:bg-main-100">
            <i class="bi bi-box-arrow-right"></i>
            Log out
          </a>
          </div>
        </div>
        </div>
      </div>
      </header>
    `;

    const notifToggle = this.querySelector("[data-notif-toggle]");
    const notifMenu = this.querySelector("[data-notif-menu]");
    const profileToggle = this.querySelector("[data-profile-toggle]");
    const profileMenu = this.querySelector("[data-profile-menu]");

    const closeMenus = () => {
      [notifMenu, profileMenu].forEach((menu) => {
        if (menu && !menu.classList.contains("hidden")) {
          menu.classList.add("hidden");
        }
      });
      [notifToggle, profileToggle].forEach((toggle) => {
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    };

    const toggleMenu = (toggle, menu) => {
      if (!toggle || !menu) return;
      const isOpen = !menu.classList.contains("hidden");
      closeMenus();
      if (!isOpen) {
        menu.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
      }
    };

    if (notifToggle && notifMenu) {
      notifToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu(notifToggle, notifMenu);
      });
    }

    if (profileToggle && profileMenu) {
      profileToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu(profileToggle, profileMenu);
      });
    }

    this._onDocClick = (event) => {
      if (notifMenu && (notifMenu.contains(event.target) || notifToggle?.contains(event.target))) {
        return;
      }
      if (profileMenu && (profileMenu.contains(event.target) || profileToggle?.contains(event.target))) {
        return;
      }
      closeMenus();
    };

    document.addEventListener("click", this._onDocClick);
  }

  disconnectedCallback() {
    if (this._onDocClick) {
      document.removeEventListener("click", this._onDocClick);
    }
  }
}

customElements.define("app-topbar", AppTopbar);
