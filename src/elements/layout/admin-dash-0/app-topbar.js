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
            
            <!-- Notifications Icon -->
            <button class="p-2 rounded-full hover:bg-white/40 transition">
              <i class="bi bi-bell"></i>
            </button>

            <!-- User Avatar -->
            <user-avatar
              src="https://avatars.githubusercontent.com/u/153155657?v=4"
              alt="Admin User"
              initials="AU"
              size="50"
              status="online"
              rounded="full"
            ></user-avatar>

          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-topbar", AppTopbar);
