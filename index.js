//Não alterar nada, sistema funcionando perfeitamente

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const sideMenu = document.querySelector("aside");

  const menuBtnMobile = document.querySelector("#menu-btn");
  const closeBtn = document.querySelector("#close-btn");

  // ==========================================================================
  // CONTROLE GLOBAL DO MENU LATERAL (CORRIGE O PROBLEMA DE SUMIR)
  // ==========================================================================

  // Captura todos os botões hambúrgueres do desktop adicionados nas abas
  const menuDesktopButtons = document.querySelectorAll(".menu-desktop-toggle");

  // Monitora o clique em qualquer um dos botões hambúrgueres para alternar a sidebar de forma fluida
  menuDesktopButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      container.classList.toggle("sidebar-hidden");
    });
  });

  // ABRIR o menu no Mobile
  if (menuBtnMobile) {
    menuBtnMobile.addEventListener("click", () => {
      sideMenu.classList.add("active");
    });
  }

  // FECHAR o menu (PC e Mobile)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      container.classList.add("sidebar-hidden"); // Esconde no PC
      sideMenu.classList.remove("active"); // Esconde no Mobile
    });
  }

  // ALTERNAR O TEMA ESCURO (Sincronizado para funcionar no Login e no Dashboard!)
  const themeTogglerButtons = document.querySelectorAll(".theme-toggler");

  themeTogglerButtons.forEach((toggler) => {
    toggler.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme-variables");

      // Sincroniza os ícones de Sol e Lua de TODOS os seletores da tela
      themeTogglerButtons.forEach((btn) => {
        btn.querySelector("span:nth-child(1)").classList.toggle("active");
        btn.querySelector("span:nth-child(2)").classList.toggle("active");
      });
    });
  });

  // ==========================================================================
  // LÓGICA DO FORMULÁRIO DE LOGIN (PROTÓTIPO DE APRESENTAÇÃO)
  // ==========================================================================
  const loginForm = document.getElementById("systemLoginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const user = document.getElementById("inputUser").value;
      const pass = document.getElementById("inputPass").value;

      // Credenciais exclusivas para a reunião mantidas por você
      if (user === "Polimatec" && pass === "Poli@2026") {
        const loginOverlay = document.getElementById("loginOverlay");

        if (loginOverlay) loginOverlay.classList.add("hidden-layout");
        if (container) container.classList.remove("hidden-layout");

        // Reseta a visualização forçando a exibição do painel principal (Dashboard) ao logar
        document
          .querySelectorAll(".system-view")
          .forEach((view) => view.classList.add("hidden-layout"));
        const defaultView = document.getElementById("view-dashboard");
        if (defaultView) defaultView.classList.remove("hidden-layout");

        // Sincroniza o estado ativo no menu lateral
        document
          .querySelectorAll(".tab-link")
          .forEach((link) => link.classList.remove("active"));
        const defaultLink = document.querySelector(
          '[data-target="view-dashboard"]',
        );
        if (defaultLink) defaultLink.classList.add("active");
      } else {
        alert("😭 Usuário não encontrado.");
      }
    });
  }

  // ==========================================================================
  // MOTOR DE NAVEGAÇÃO DE ABAS DINÂMICO (CORRIGE O ERRO DE NÃO ALTERNAR AS ABAS)
  // ==========================================================================
  const tabLinks = document.querySelectorAll(".tab-link");
  const systemViews = document.querySelectorAll(".system-view");

  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // 1. Remove a classe active de todos os links do menu lateral
      tabLinks.forEach((l) => l.classList.remove("active"));

      // 2. Adiciona a classe active no link que você clicou
      link.classList.add("active");

      // 3. Oculta todas as seções centrais do sistema
      systemViews.forEach((view) => view.classList.add("hidden-layout"));

      // 4. Busca o ID correto mapeado no HTML pelo data-target e remove o oculto dele
      const targetId = link.getAttribute("data-target");
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.remove("hidden-layout");
      }
    });
  });

  // ==========================================================================
  // LÓGICA DE ABERTURA, FECHAMENTO E EDIÇÃO DO MODAL "PARCEIROS"
  // ==========================================================================
  const modal = document.getElementById("modalParceiro");
  const modalTitulo = document.getElementById("modal-titulo");
  const btnAbrirModal = document.getElementById("btn-novo-parceiro");
  const btnFecharModalIcon = document.getElementById("close-modal-btn");
  const btnCancelarModal = document.getElementById("btn-cancelar-modal");
  const formNovoParceiro = document.getElementById("formNovoParceiro");

  const btnEditarLista = document.querySelectorAll(".btn-editar-parceiro");

  if (modal) {
    if (btnAbrirModal) {
      btnAbrirModal.addEventListener("click", () => {
        if (modalTitulo) modalTitulo.textContent = "Novo Parceiro";
        if (formNovoParceiro) formNovoParceiro.reset();
        modal.classList.remove("hidden-layout");
      });
    }

    btnEditarLista.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        const card = e.target.closest(".parceiro-card");

        if (card) {
          if (modalTitulo) modalTitulo.textContent = "Editar Parceiro";

          const razaoSocial = card.querySelector(".p-razao").textContent.trim();
          const nomeFantasia = card
            .querySelector(".p-fantasia")
            .textContent.trim();
          const tipoText = card.querySelector(".p-tipo").textContent.trim();

          document.getElementById("modalInputRazao").value = razaoSocial;
          document.getElementById("modalInputFantasia").value = nomeFantasia;

          const selectTipo = document.getElementById("modalInputTipo");
          if (selectTipo) {
            if (tipoText === "FORNECEDOR") {
              selectTipo.value = "Fornecedor";
            } else {
              selectTipo.value = "Cliente";
            }
          }

          modal.classList.remove("hidden-layout");
        }
      });
    });

    if (btnFecharModalIcon) {
      btnFecharModalIcon.addEventListener("click", () =>
        modal.classList.add("hidden-layout"),
      );
    }

    if (btnCancelarModal) {
      btnCancelarModal.addEventListener("click", () =>
        modal.classList.add("hidden-layout"),
      );
    }

    if (formNovoParceiro) {
      formNovoParceiro.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(
          "✨ Sucesso! Dados processados e salvos com sucesso no protótipo.",
        );
        formNovoParceiro.reset();
        modal.classList.add("hidden-layout");
      });
    }
  }

  // ==========================================================================
  // LÓGICA DO MENU SUSPENSO DE FILTROS (MOVIMENTAÇÕES)
  // ==========================================================================
  const btnFiltroStatus = document.getElementById("btn-filtro-status");
  const dropdownFiltroStatus = document.getElementById(
    "dropdown-filtro-status",
  );
  const txtFiltroAtual = document.getElementById("txt-filtro-atual");
  const statusOptions = document.querySelectorAll(".status-option");

  if (btnFiltroStatus && dropdownFiltroStatus) {
    btnFiltroStatus.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownFiltroStatus.classList.toggle("hidden-layout");
    });

    statusOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        const statusSelecionado =
          option.getAttribute("data-status") || option.innerText.trim();

        if (txtFiltroAtual) txtFiltroAtual.textContent = statusSelecionado;

        statusOptions.forEach((opt) => {
          opt.classList.remove("option-active");
          const checkIcon = opt.querySelector("span");
          if (checkIcon) checkIcon.remove();
        });

        option.classList.add("option-active");
        option.innerHTML = `${statusSelecionado} <span class="material-symbols-outlined" style="font-size: 1.1rem; color: #2563eb;">check</span>`;

        dropdownFiltroStatus.classList.add("hidden-layout");
      });
    });

    document.addEventListener("click", () => {
      dropdownFiltroStatus.classList.add("hidden-layout");
    });
  }

  // ==========================================================================
  // LÓGICA DE ABERTURA E FECHAMENTO DO MODAL "MOTORISTAS"
  // ==========================================================================
  const modalMotorista = document.getElementById("modalMotorista");
  const btnAbrirModalMotorista = document.getElementById("btn-novo-motorista");
  const btnFecharModalMotoristaIcon = document.getElementById(
    "close-modal-motorista-btn",
  );
  const btnCancelarModalMotorista = document.getElementById(
    "btn-cancelar-motorista",
  );
  const formNovoMotorista = document.getElementById("formNovoMotorista");

  if (btnAbrirModalMotorista && modalMotorista) {
    btnAbrirModalMotorista.addEventListener("click", () => {
      if (formNovoMotorista) formNovoMotorista.reset();
      modalMotorista.classList.remove("hidden-layout");
    });

    if (btnFecharModalMotoristaIcon) {
      btnFecharModalMotoristaIcon.addEventListener("click", () =>
        modalMotorista.classList.add("hidden-layout"),
      );
    }

    if (btnCancelarModalMotorista) {
      btnCancelarModalMotorista.addEventListener("click", () =>
        modalMotorista.classList.add("hidden-layout"),
      );
    }

    if (formNovoMotorista) {
      formNovoMotorista.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("✨ Sucesso! Novo motorista simulado e cadastrado no protótipo.");
        formNovoMotorista.reset();
        modalMotorista.classList.add("hidden-layout");
      });
    }
  }

  // ==========================================================================
  // CONTROLE INTERNO DA VIEW DE MOVIMENTAÇÕES (LISTA VS FORMULÁRIO)
  // ==========================================================================
  const wrapperLista = document.getElementById("movimentacoes-lista-wrapper");
  const wrapperCadastro = document.getElementById(
    "movimentacoes-cadastro-wrapper",
  );

  const btnAbrirCadastroMov = document.getElementById("btn-abrir-cadastro-mov");
  const btnVoltarMov = document.getElementById("btn-voltar-mov");
  const btnCancelarMov = document.getElementById("btn-cancelar-mov");
  const formNovaMovimentacao = document.getElementById("formNovaMovimentacao");

  function alternarFormularioMov(exibirFormulario) {
    if (exibirFormulario) {
      if (wrapperLista) wrapperLista.classList.add("hidden-layout");
      if (wrapperCadastro) wrapperCadastro.classList.remove("hidden-layout");
    } else {
      if (wrapperCadastro) wrapperCadastro.classList.add("hidden-layout");
      if (wrapperLista) wrapperLista.classList.remove("hidden-layout");
    }
  }

  if (btnAbrirCadastroMov) {
    btnAbrirCadastroMov.addEventListener("click", () =>
      alternarFormularioMov(true),
    );
  }

  if (btnVoltarMov) {
    btnVoltarMov.addEventListener("click", () => alternarFormularioMov(false));
  }

  if (btnCancelarMov) {
    btnCancelarMov.addEventListener("click", () => {
      if (formNovaMovimentacao) formNovaMovimentacao.reset();
      alternarFormularioMov(false);
    });
  }

  if (formNovaMovimentacao) {
    formNovaMovimentacao.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "🚀 Sucesso! Nova movimentação registrada com sucesso no protótipo PoliLog.",
      );
      formNovaMovimentacao.reset();
      alternarFormularioMov(false);
    });
  }
});
/*Configuração funcionando perfeitamente, testado e aprovado por mim.
aproveitar para estudar e configurar o Background e adicinoar no banco de dados de acordo com a sugestão do Nailton*/

// ==========================================================================
// LÓGICA DO MODAL "TIPOS DE VEÍCULO (ID. VEÍCULOS)"
// ==========================================================================
const modalIdVeiculo = document.getElementById("modalIdVeiculo");
const btnAbrirIdVeiculo = document.getElementById("btn-novo-id-veiculo");
const btnFecharIdVeiculoX = document.getElementById("close-modal-id-veiculo");
const btnCancelarIdVeiculo = document.getElementById("btn-cancelar-id-veiculo");
const formNovoIdVeiculo = document.getElementById("formNovoIdVeiculo");

if (btnAbrirIdVeiculo && modalIdVeiculo) {
  // Abre o modal
  btnAbrirIdVeiculo.addEventListener("click", () => {
    if (formNovoIdVeiculo) formNovoIdVeiculo.reset();
    modalIdVeiculo.classList.remove("hidden-layout");
  });

  // Fecha clicando no X ou em Cancelar
  [btnFecharIdVeiculoX, btnCancelarIdVeiculo].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () =>
        modalIdVeiculo.classList.add("hidden-layout"),
      );
    }
  });

  // Envio simulado do formulário
  if (formNovoIdVeiculo) {
    formNovoIdVeiculo.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "🏷️ Novo tipo de veículo e valor padrão cadastrados com sucesso no PoliLog!",
      );
      formNovoIdVeiculo.reset();
      modalIdVeiculo.classList.add("hidden-layout");
    });
  }
}
// ==========================================================================
// LÓGICA DE ABERTURA E FECHAMENTO DO MODAL "COLABORADORES"
// ==========================================================================
const modalColaborador = document.getElementById("modalColaborador");
const btnAbrirModalColaborador = document.getElementById(
  "btn-novo-colaborador",
);
const btnFecharModalColaboradorIcon = document.getElementById(
  "close-modal-colaborador-btn",
);
const btnCancelarModalColaborador = document.getElementById(
  "btn-cancelar-colaborador",
);
const formNovoColaborador = document.getElementById("formNovoColaborador");

if (btnAbrirModalColaborador && modalColaborador) {
  btnAbrirModalColaborador.addEventListener("click", () => {
    if (formNovoColaborador) formNovoColaborador.reset();
    modalColaborador.classList.remove("hidden-layout");
  });

  if (btnFecharModalColaboradorIcon) {
    btnFecharModalColaboradorIcon.addEventListener("click", () =>
      modalColaborador.classList.add("hidden-layout"),
    );
  }

  if (btnCancelarModalColaborador) {
    btnCancelarModalColaborador.addEventListener("click", () =>
      modalColaborador.classList.add("hidden-layout"),
    );
  }

  if (formNovoColaborador) {
    formNovoColaborador.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✨ Sucesso! Novo colaborador simulado e cadastrado no protótipo.");
      formNovoColaborador.reset();
      modalColaborador.classList.add("hidden-layout");
    });
  }
}
