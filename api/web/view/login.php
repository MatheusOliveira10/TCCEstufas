<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=no"
    />
    <meta
      name="description"
      content="Semantic-UI-Forest, collection of design, themes and templates for Semantic-UI."
    />
    <meta name="keywords" content="Semantic-UI, Theme, Design, Template" />
    <meta name="author" content="PPType" />
    <meta name="theme-color" content="#ffffff" />
    <title>Login</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
      type="text/css"
    />
    <style type="text/css">
      body {
        background-color: #dadada;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: grayscale;
      }

      body > .ui.grid {
        height: 100%;
      }

      .column {
        max-width: 450px;
      }
    </style>
  </head>

  <body id="root">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal center aligned header">
          Login
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input name="email" placeholder="E-mail" type="text" />
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input name="password" placeholder="Senha" type="password" />
              </div>
            </div>
            <div class="ui fluid large teal submit button">Login</div>
          </div>
          <div class="ui error message"></div>
        </form>
        <div class="ui message">Novo por aqui?<a href="#root"> Cadastre-se</a></div>
      </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.js"></script>
    <script>
      $(document).ready(function() {
        $(".ui.form").form({
          fields: {
            email: {
              identifier: "email",
              rules: [
                {
                  type: "empty",
                  prompt: "Digite seu e-mail"
                },
                {
                  type: "email",
                  prompt: "Por favor, digite um e-mail válido"
                }
              ]
            },
            password: {
              identifier: "password",
              rules: [
                {
                  type: "empty",
                  prompt: "Por favor, digite sua senha"
                },
                {
                  type: "length[6]",
                  prompt: "Sua senha deve ter no mínimo, 6 caracteres"
                }
              ]
            }
          }
        });
      });
    </script>
  
    <script>
    (function(i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-87734989-1", "auto");
    ga("send", "pageview");
    </script>
  </body>
</html>
