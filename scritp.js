document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // PRELOADER
  // =========================

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (preloader) {
        preloader.classList.add("hidden");
      }

      document.body.classList.add("loaded");

    }, 600);

  });


  // =========================
  // MENÚ MÓVIL
  // =========================

  const menuToggle =
    document.getElementById("menuToggle");

  const navMenu =
    document.getElementById("navMenu");

  const navLinks =
    document.querySelectorAll(".nav-link");


  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Cerrar menú"
          : "Abrir menú"
      );

      menuToggle.textContent =
        isOpen ? "×" : "☰";

    });

  }


  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (navMenu) {
        navMenu.classList.remove("open");
      }

      if (menuToggle) {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Abrir menú"
        );

        menuToggle.textContent = "☰";

      }

    });

  });


  // =========================
  // HEADER AL HACER SCROLL
  // =========================

  const header =
    document.getElementById("header");


  function handleHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    handleHeader
  );

  handleHeader();


  // =========================
  // ANIMACIONES REVEAL
  // =========================

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "active"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("active");

    });

  }


  // =========================
  // NAVEGACIÓN ACTIVA
  // =========================

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  function updateActiveNav() {

    const scrollPosition =
      window.scrollY + 180;


    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      const sectionId =
        section.getAttribute("id");


      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        navLinks.forEach((link) => {

          link.classList.remove(
            "active"
          );

        });


        const activeLink =
          document.querySelector(
            `.nav-link[href="#${sectionId}"]`
          );


        if (activeLink) {

          activeLink.classList.add(
            "active"
          );

        }

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNav
  );

  updateActiveNav();


  // =========================
  // SCROLL SUAVE
  // =========================

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener(
        "click",
        (event) => {

          const targetId =
            anchor.getAttribute("href");


          if (targetId === "#") {

            event.preventDefault();

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            const headerHeight =
              header
                ? header.offsetHeight
                : 0;


            const targetPosition =
              target.getBoundingClientRect()
                .top +
              window.scrollY -
              headerHeight;


            window.scrollTo({

              top: targetPosition,

              behavior: "smooth"

            });

          }

        }
      );

    });


  // =========================
  // BOTÓN VOLVER ARRIBA
  // =========================

  const backTop =
    document.getElementById(
      "backTop"
    );


  if (backTop) {

    backTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  // =========================
  // AÑO AUTOMÁTICO
  // =========================

  const currentYear =
    document.getElementById(
      "currentYear"
    );


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  // =========================
  // FORMULARIO DE CONTACTO
  // =========================

  const form =
    document.getElementById(
      "contactForm"
    );

  const formStatus =
    document.getElementById(
      "formStatus"
    );


  if (form) {

    const requiredFields = [

      {
        id: "name",
        message:
          "Escribe tu nombre."
      },

      {
        id: "business",
        message:
          "Escribe el nombre de tu negocio."
      },

      {
        id: "businessType",
        message:
          "Selecciona el tipo de negocio."
      },

      {
        id: "service",
        message:
          "Selecciona el servicio."
      },

      {
        id: "message",
        message:
          "Cuéntame sobre tu proyecto."
      }

    ];


    function clearErrors() {

      document
        .querySelectorAll(".form-group")
        .forEach((group) => {

          group.classList.remove(
            "invalid"
          );


          const error =
            group.querySelector(
              ".error-message"
            );


          if (error) {

            error.textContent = "";

          }

        });

    }


    function showError(
      input,
      message
    ) {

      const group =
        input.closest(
          ".form-group"
        );


      if (!group) return;


      group.classList.add(
        "invalid"
      );


      const error =
        group.querySelector(
          ".error-message"
        );


      if (error) {

        error.textContent =
          message;

      }

    }


    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        clearErrors();

        let valid = true;


        requiredFields.forEach(
          (field) => {

            const input =
              document.getElementById(
                field.id
              );


            if (
              !input ||
              !input.value.trim()
            ) {

              if (input) {

                showError(
                  input,
                  field.message
                );

              }

              valid = false;

            }

          }
        );


        if (!valid) {

          if (formStatus) {

            formStatus.textContent =
              "Por favor, completa los campos obligatorios.";

          }

          return;

        }


        const name =
          document
            .getElementById("name")
            .value.trim();


        const business =
          document
            .getElementById("business")
            .value.trim();


        const businessType =
          document
            .getElementById(
              "businessType"
            )
            .value;


        const service =
          document
            .getElementById("service")
            .value;


        const budgetElement =
          document.getElementById(
            "budget"
          );


        const budget =
          budgetElement &&
          budgetElement.value
            ? budgetElement.value
            : "No especificado";


        const message =
          document
            .getElementById("message")
            .value.trim();


        const subject =
          `Solicitud de página web - ${business}`;


        const emailBody = `
Hola Emil,

Me gustaría solicitar información sobre una página web.

NOMBRE:
${name}

NEGOCIO:
${business}

TIPO DE NEGOCIO:
${businessType}

SERVICIO:
${service}

PRESUPUESTO:
${budget}

MENSAJE:
${message}

Gracias.
`;


        const mailto =
          "mailto:rivasricoemil@gmail.com" +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(
            emailBody
          );


        if (formStatus) {

          formStatus.textContent =
            "Preparando tu solicitud...";

        }


        setTimeout(() => {

          window.location.href =
            mailto;


          if (formStatus) {

            formStatus.textContent =
              "Tu aplicación de correo debería abrirse ahora.";

          }

        }, 500);

      }
    );


    // =========================
    // LIMPIAR ERRORES
    // =========================

    const inputs =
      form.querySelectorAll(
        "input, select, textarea"
      );


    inputs.forEach((input) => {

      input.addEventListener(
        "input",
        () => {

          const group =
            input.closest(
              ".form-group"
            );


          if (!group) return;


          group.classList.remove(
            "invalid"
          );


          const error =
            group.querySelector(
              ".error-message"
            );


          if (error) {

            error.textContent = "";

          }

        }
      );

      input.addEventListener(
        "change",
        () => {

          const group =
            input.closest(
              ".form-group"
            );


          if (!group) return;


          group.classList.remove(
            "invalid"
          );


          const error =
            group.querySelector(
              ".error-message"
            );


          if (error) {

            error.textContent = "";

          }

        }
      );

    });

  }


  // =========================
  // EFECTO PARALLAX DEL HERO
  // =========================

  const heroVisual =
    document.querySelector(
      ".hero-visual"
    );


  window.addEventListener(
    "mousemove",
    (event) => {

      if (!heroVisual) return;


      if (window.innerWidth < 900) {
        return;
      }


      const x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 8;


      const y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 8;


      heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );


  // =========================
  // BOTONES DE CONTACTO/PAGO
  // =========================

  const paymentContactButtons =
    document.querySelectorAll(
      ".payment-contact-btn"
    );


  paymentContactButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          button.classList.add(
            "payment-clicked"
          );


          setTimeout(() => {

            button.classList.remove(
              "payment-clicked"
            );

          }, 400);

        }
      );

    }
  );


});
