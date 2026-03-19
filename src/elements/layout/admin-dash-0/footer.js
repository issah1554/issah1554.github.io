export class AppFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 text-gray-600 text-sm flex items-center justify-center gap-3 flex-wrap font-sans">
        
        <span>
          Copyright © ${year} <a href="https://databenki.com" target="_blank" class="text-blue-600 hover:underline">Databenki</a>. All rights reserved.
        </span>

      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);