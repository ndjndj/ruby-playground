// メニュー操作

// トグルリスナーを追加して Click event を listen する
documenut.addEventListener(
    "turbo:load",
    function() {
        let account = document.querySelector("account");
        account.addEventListener(
            "click",
            function(event) {
                event.preventDefault();
                let menu = document.querySelector("#dropdown-menu");
                menu.classList.toggle("active");
            }
        )
    }
)