
<?
/**
 * Plugin Name: Dare2Care Quiz
 * Description: A plugin designed specifically for the relationship quiz for the Dare2Care project
 * Version: 1.0.1
 * Author: Karina Klinkevičiūtė, Asociacija Lygiai, 
 */

function dare2care(){

 $content = '
 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

    <div id="quiz" class="container">
        <div id="intro" class="block"> 
            <div class="box">
            Sveiki! Kviečiam atlikti santykių testą, kuris padės įvertinti jūsų santykių sveikumą.
            Testą sudaro 9 klausimai, kurie turi po tris galimus atsakymų variantus. Visos situacijos yra numanomos, nebūtinai jums realiai nutikusios, o atsakydami rinkitės atsakymą pagal tai, kaip galvojate, jog sureaguotų jūsų partneris/partnerė. Kiekvienas klausimas turi po vieną pasirinkimo galimybę.
            Mes suprantame, jog porų gali būti įvairių, tad pavaizduoti personažai yra tik maža dalis porų įvairovės.
            Pabaigę testą, gausite rezultatą, kuris parinktas pagal susumuotus jūsų atsakymų taškus. Po aprašymo pamatysite trumpą kiekvieno jūsų pasirinkto atsakymo komentarą.
            Testą galite kartoti kelis kartus, nes jo klausimai gali skirtis.

            </div>
            <button id="start" class="button block">Pradėti testą</button>
        </div>
        <div id="situation" hidden class="tile is-ancestor">
            <div class="tile is-vertical is-8">
                <div id="image" class="image is-4by3"></div>
                <div id="description" class="tile is-parent"></div>
                <ul id="choices" class="tile is-parent">
                    <li id="A" class="box"></li>
                    <li id="B" class="box"></li>
                    <li id="C" class="box"></li>
                </ul>
                <button id="submit" class="button">Pateikti</button>
            </div>
        </div>
        <div id="results" class="tile is-ancestor">
        
        </div>
        <div class="explanations" id="explanations">
            <div id = "explanation" class="explanation hidden" style="display:none">
                <div id="explanation-image" class="image is-4by3 explanation-image"></div>
                        <div id="explanation-description" class="tile is-parent explanation-description"></div>
                        <ul id="explanation-choices" class="tile is-parent explanation-choices">
                            <li id="explanation-A" class="box"></li>
                            <li id="explanation-B" class="box"></li>
                            <li id="explanation-C" class="box"></li>
                        </ul>
                        <div id = "explanation-text" class="explanation-text"></div>
            </div>
        </div>

    </div>


<script type="module" src="dare2care-quiz.js"></script>
';

return $content;

}

add_shortcode('dare2care', 'dare2care');