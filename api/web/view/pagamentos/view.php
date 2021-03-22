<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossorigin="anonymous" />
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha256-t8GepnyPmw9t+foMh3mKNvcorqNHamSKtKRxxpUEgFI=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery-1.2.6.pack.js"></script>
    <script type="text/javascript" src="js/jquery.maskedinput-1.1.4.pack.js">
    </script>

    <title>Form SI 5A</title>
</head>

<body>
    <div class="ui container">
        <div class="ui pointing menu">
            <a href="/" class="item">
                Home
            </a>
            <a href="/reserva" class="item">
                Reserva
            </a>
            <a href="/pagamento" class="active item">
                Pagar
            </a>
            <a href="/cancela" class="item">
                Cancelar
            </a>
            <a href="/passageiro" class="item">
                Passageiro
            </a>
            <div class="right menu">
                <div class="item">
                    <div class="ui transparent icon input">
                        <input type="text" placeholder="Search...">
                        <i class="search link icon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui segment">
            <h2>Pagamentos <a style="float: right" href="/pagamento/cadastrar"><i class="red plus icon"></i></a></h2>
            <table class="ui red table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($pagamentos as $pagamento) { ?>
                        <tr>
                            <td><?php echo $pagamento['id'] ?></td>
                            <td><?php echo $pagamento['nome'] ?></td>
                            <td>R$<?php echo $pagamento['preco'] ?></td>
                            <td><?php echo $pagamento['data'] ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
</body>

</html>