
<?php
/**
 * Plugin Name: Dare2Care Quiz
 * Description: A plugin designed specifically for the relationship quiz for the Dare2Care project
 * Version: 1.0.1
 * Author: Karina Klinkevičiūtė, Asociacija Lygiai, Dingusių žmonių šeimų paramos centras
 */



function dare2care( $atts, $content, $tag ) {

    wp_register_style( 'dare2care', 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css' );

    wp_enqueue_style('dare2care-style', plugins_url('dare2care-quiz.css', __FILE__));

    wp_enqueue_script('dare2care-quiz', plugins_url( 'dare2care-quiz.js', __FILE__ ), in_footer : true);

    $image_base_url = plugins_url( 'images/', __FILE__ );

 $content = '


    <div id="d2c-quiz" class="d2c-quiz-container">
        <div id="intro" class="block quiz-intro"> 
            <div class="box quiz-box">
            Sveiki! Kviečiam atlikti santykių testą, kuris padės įvertinti jūsų santykių sveikumą.
            Testą sudaro 9 klausimai, kurie turi po tris galimus atsakymų variantus. Visos situacijos yra numanomos, nebūtinai jums realiai nutikusios, o atsakydami rinkitės atsakymą pagal tai, kaip galvojate, jog sureaguotų jūsų partneris/partnerė. Kiekvienas klausimas turi po vieną pasirinkimo galimybę.
            Mes suprantame, jog porų gali būti įvairių, tad pavaizduoti personažai yra tik maža dalis porų įvairovės.
            Pabaigę testą, gausite rezultatą, kuris parinktas pagal susumuotus jūsų atsakymų taškus. Po aprašymo pamatysite trumpą kiekvieno jūsų pasirinkto atsakymo komentarą.
            Testą galite kartoti kelis kartus, nes jo klausimai gali skirtis.

            </div>
            <button id="start" class="button block">Pradėti testą</button>
        </div>
        <div id="situation" hidden class="tile is-ancestor">
            <div class="tile is-vertical is-8 quiz-tile">
                <div id="image" class="quiz-tile__image image is-4by3"><img id="image-tag" src="'.$image_base_url.'" alt=""></div>
                <div class="quiz-tile__content">
                <div id="description" class="tile is-parent quiz-question"></div>
                <ul id="choices" class="tile is-parent quiz-choices">
                    <li id="A" class="box quiz-answer-box"></li>
                    <li id="B" class="box quiz-answer-box"></li>
                    <li id="C" class="box quiz-answer-box"></li>
                </ul>
                <button id="submit" class="button">Pateikti</button>
                </div>
            </div>
        </div>
        <div id="results" class="tile is-ancestor quiz-results">
        </div>
        <div class="explanations" id="explanations">
            <div id = "explanation" class="explanation hidden" style="display:none">
                <div id="explanation-image" class="image is-4by3 explanation-image"></div>
                        <div id="explanation-description" class="tile is-parent explanation-description"></div>
                        <ul id="explanation-choices" class="tile is-parent explanation-choices">
                            <li id="explanation-A" class="box quiz-explanation-box"></li>
                            <li id="explanation-B" class="box quiz-explanation-box"></li>
                            <li id="explanation-C" class="box quiz-explanation-box"></li>
                        </ul>
                        <div id="explanation-text" class="explanation-text"></div>
            </div>
        </div>

    </div>

';

return $content;

};

add_shortcode('d2c', 'dare2care');

function register_shortcodes() {
    add_shortcode('d2c', 'dare2care');
};

add_action( 'init', 'register_shortcodes');
