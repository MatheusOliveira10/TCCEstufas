<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossorigin="anonymous" />
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="/view/CSS/style.css">
    <link rel="stylesheet" href="/view/CSS/style_preferencial.css">
    <link rel="stylesheet" href="/view/CSS/style_overbooking.css">
    <link rel="stylesheet" href="/view/CSS/style_prefe_over.css">


    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha256-t8GepnyPmw9t+foMh3mKNvcorqNHamSKtKRxxpUEgFI=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery-1.2.6.pack.js"></script>
    <script type="text/javascript" src="js/jquery.maskedinput-1.1.4.pack.js">
    </script>

    <title>Home</title>
</head>

<body>
    <div class="ui container">
        <div class="ui pointing menu">
            <a href="/" class="item">
                Home
            </a>
            <a href="/reserva" class="active item">
                Reserva
            </a>
            <a href="/pagamento" class="item">
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
            <h2 class="ui red dividing header">Faça a sua Reserva! <a style="float: right" href="/reserva/view"><i class="red eye icon"></i></a></h2>
        <form class="ui form" action="/reserva/save" method="post">
        <h4 class="ui dividing header">Definições: </h4>

        <div class="field">
            <label>Passageiro</label>
            <select name="passageiro">
                <?php foreach ($passageiros as $passageiro) { ?>
                    <option value="<?php echo $passageiro['id'] ?>"><?php echo $passageiro['nome'] ?> </option>
                <?php } ?>
            </select>
        </div>
        <div class="field">
            <label for="preco">Preço</label>
            <input type="number" step="0.01" placeholder="Digite o Preço" id="preco" name="preco">
        </div>
        
        <h4 class="ui dividing header">Escolha o Assento: </h4>

        <div class="plane">
                <div class="cockpit">
                    <h1>Por favor selecione um assento</h1>
                </div>
                <div class="exit exit--front fuselage">
                </div>
                    <ol class="cabin fuselage">
                        <li class="row row--1">
                            <ol class="seats" type="A">
                                <li class="seat_p">
                                    <input type="checkbox" id="1A" name="1A" <?php if ($assentos[0]['id_passagem'] != null) { echo 'disabled'; } ?>/>
                                    <label for="1A">1A</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="1B" name="1B" <?php if ($assentos[1]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="1B">1B</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="1C" name="1C" <?php if ($assentos[2]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="1C">1C</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="1D" name="1D" <?php if ($assentos[3]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="1D">1D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--2">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="2A" name="2A" <?php if ($assentos[4]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="2A">2A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="2B" name="2B" <?php if ($assentos[5]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="2B">2B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="2C" name="2C" <?php if ($assentos[6]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="2C">2C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="2D" name="2D" <?php if ($assentos[7]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="2D">2D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--3">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="3A" name="3A" <?php if ($assentos[8]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="3A">3A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="3B" name="3B" <?php if ($assentos[9]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="3B">3B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="3C" name="3C" <?php if ($assentos[10]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="3C">3C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="3D" name="3D" <?php if ($assentos[11]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="3D">3D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--4">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="4A" name="4A" <?php if ($assentos[12]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="4A">4A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="4B" name="4B" <?php if ($assentos[13]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="4B">4B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="4C" name="4C" <?php if ($assentos[14]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="4C">4C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="4D" name="4D" <?php if ($assentos[15]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="4D">4D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--5">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="5A" name="5A" <?php if ($assentos[16]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="5A">5A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="5B" name="5B" <?php if ($assentos[17]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="5B">5B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="5C" name="5C" <?php if ($assentos[18]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="5C">5C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="5D" name="5D" <?php if ($assentos[19]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="5D">5D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--6">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="6A" name="6A" <?php if ($assentos[20]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="6A">6A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="6B" name="6B" <?php if ($assentos[21]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="6B">6B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="6C" name="6C" <?php if ($assentos[22]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="6C">6C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="6D" name="6D" <?php if ($assentos[23]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="6D">6D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--7">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="7A" name="7A" <?php if ($assentos[24]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="7A">7A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="7B" name="7B" <?php if ($assentos[25]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="7B">7B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="7C" name="7C" <?php if ($assentos[26]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="7C">7C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="7D" name="7D" <?php if ($assentos[27]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="7D">7D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--8">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="8A" name="8A" <?php if ($assentos[28]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="8A">8A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="8B" name="8B" <?php if ($assentos[29]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="8B">8B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="8C" name="8C" <?php if ($assentos[30]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="8C">8C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="8D" name="8D" <?php if ($assentos[31]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="8D">8D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--9">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="9A" name="9A" <?php if ($assentos[32]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="9A">9A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="9B"  name="9B" <?php if ($assentos[33]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="9B">9B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="9C" name="9C" <?php if ($assentos[34]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="9C">9C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="9D" name="9D" <?php if ($assentos[35]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="9D">9D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--10">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="10A" name="10A" <?php if ($assentos[36]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="10A">10A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="10B" name="10B"  <?php if ($assentos[37]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="10B">10B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="10C" name="10C" <?php if ($assentos[38]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="10C">10C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="10D" name="10D" <?php if ($assentos[39]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="10D">10D</label>
                                </li>
                            </ol>
                        </li>
                        <br><br>
                        <li class="row row--11">
                            <ol class="seats" type="A">
                                <li class="seat_p">
                                    <input type="checkbox" id="11A" name="11A" <?php if ($assentos[40]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="11A">11A</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="11B" name="11B" <?php if ($assentos[41]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="11B">11B</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="11C" name="11C" <?php if ($assentos[42]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="11C">11C</label>
                                </li>
                                <li class="seat_p">
                                    <input type="checkbox" id="11D" name="11D" <?php if ($assentos[43]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="11D">11D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--12">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="12A" name="12A" <?php if ($assentos[44]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="12A">12A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="12B" name="12B" <?php if ($assentos[45]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="12B">12B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="12C" name="12C" <?php if ($assentos[46]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="12C">12C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="12D" name="12D" <?php if ($assentos[47]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="12D">12D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--13">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="13A" name="13A" <?php if ($assentos[48]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="13A">13A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="13B" name="13B" <?php if ($assentos[49]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="13B">13B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="13C" name="13C" <?php if ($assentos[50]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="13C">13C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="13D" name="13D" <?php if ($assentos[51]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="13D">13D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--14">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="14A" name="14A" <?php if ($assentos[52]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="14A">14A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="14B" name="14B" <?php if ($assentos[53]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="14B">14B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="14C" name="14C" <?php if ($assentos[54]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="14C">14C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="14D" name="14D" <?php if ($assentos[55]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="14D">14D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--15">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="15A" name="15A" <?php if ($assentos[56]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="15A">15A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="15B" name="15B" <?php if ($assentos[57]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="15B">15B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="15C" name="15C" <?php if ($assentos[58]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="15C">15C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="15D" name="15D" <?php if ($assentos[59]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="15D">15D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--16">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="16A" name="16A" <?php if ($assentos[60]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="16A">16A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="16B" name="16B" <?php if ($assentos[61]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="16B">16B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="16C" name="16C" <?php if ($assentos[62]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="16C">16C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="16D" name="16D" <?php if ($assentos[63]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="16D">16D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--17">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="17A" name="17A" <?php if ($assentos[64]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="17A">17A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="17B" name="17B" <?php if ($assentos[65]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="17B">17B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="17C" name="17C" <?php if ($assentos[66]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="17C">17C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="17D" name="17D" <?php if ($assentos[67]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="17D">17D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--18">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="18A" name="18A" <?php if ($assentos[68]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="18A">18A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="18B" name="18B" <?php if ($assentos[69]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="18B">18B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="18C" name="18C" <?php if ($assentos[70]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="18C">18C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="18D" name="18D" <?php if ($assentos[71]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="18D">18D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--19">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="19A" name="19A" <?php if ($assentos[72]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="19A">19A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="19B" name="19B" <?php if ($assentos[73]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="19B">19B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="19C" name="19C" <?php if ($assentos[74]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="19C">19C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="19D" name="19D" <?php if ($assentos[75]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="19D">19D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--20">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="20A" name="20A" <?php if ($assentos[76]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="20A">20A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="20B" name="20B" <?php if ($assentos[77]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="20B">20B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="20C" name="20C" <?php if ($assentos[78]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="20C">20C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="20D" name="20D" <?php if ($assentos[79]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="20D">20D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--21">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="21A" name="21A" <?php if ($assentos[80]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="21A">21A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="21B" name="21B" <?php if ($assentos[81]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="21B">21B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="21C" name="21C" <?php if ($assentos[82]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="21C">21C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="21D" name="21D" <?php if ($assentos[83]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="21D">21D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--22">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="22A" name="22A" <?php if ($assentos[84]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="22A">22A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="22B" name="22B" <?php if ($assentos[85]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="22B">22B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="22C" name="22C" <?php if ($assentos[86]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="22C">22C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="22D" name="22D" <?php if ($assentos[87]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="22D">22D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--23">
                            <ol class="seats" type="A">
                                <li class="seat">
                                    <input type="checkbox" id="23A" name="23D" <?php if ($assentos[88]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="23A">23A</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="23B" name="23B" <?php if ($assentos[89]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="23B">23B</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="23C" name="23C" <?php if ($assentos[90]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="23C">23C</label>
                                </li>
                                <li class="seat">
                                    <input type="checkbox" id="23D" name="23D" <?php if ($assentos[91]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="23D">23D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--24">
                            <ol class="seats" type="A">
                                <li class="seat_po">
                                    <input type="checkbox" id="24A" name="24A" <?php if ($assentos[92]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="24A">24A</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="24B" name="24B" <?php if ($assentos[93]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="24B">24B</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="24C" name="24C" <?php if ($assentos[94]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="24C">24C</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="24D" name="24D" <?php if ($assentos[95]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="24D">24D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--25">
                            <ol class="seats" type="A">
                                <li class="seat_po">
                                    <input type="checkbox" id="25A" name="25A" <?php if ($assentos[96]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="25A">25A</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="25B" name="25B" <?php if ($assentos[97]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="25B">25B</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="25C" name="25C" <?php if ($assentos[98]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="25C">25C</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="25D" name="25D" <?php if ($assentos[99]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="25D">25D</label>
                                </li>
                            </ol>
                        </li>
                        <li class="row row--26">
                            <ol class="seats" type="A">
                                <li class="seat_po">
                                    <input type="checkbox" id="26A" name="26A" <?php if ($assentos[100]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="26A">26A</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="26B" name="26B" <?php if ($assentos[101]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="26B">26B</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="26C" name="26C" <?php if ($assentos[102]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="26C">26C</label>
                                </li>
                                <li class="seat_o">
                                    <input type="checkbox" id="26D" name="26D" <?php if ($assentos[103]['id_passagem'] != null) { echo 'disabled'; } ?> />
                                    <label for="26D">26D</label>
                                </li>
                            </ol>
                        </li>
                    </ol>
                    
                    <div class="exit exit--back fuselage"> </div>            
            
        </div>
        <input class="ui right blue button" type="submit" value="Confirmar">
        </form>
    </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function() {
            $("#cpf").mask("999.999.999-99");
        });
    </script>
</body>

</html>