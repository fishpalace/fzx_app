/**
 * Created by Evan on 16/3/8.
 * Initialize common components
 */
var menu_show = false;
$(function(){
    //Menu items constructor
    function WorkCell(w_index) {
        this.work_cell_id = "wc" + w_index;
        this.glance_img_src = "";
        this.w_link_to = "";
        this.work_name = "Work";
        this.work_year = "2000";
        this.html_con = [];
    }
    WorkCell.prototype.wcHtml = function () {
        this.html_con.push("<a href='",this.w_link_to,"'>");
        this.html_con.push("<div id='",this.work_cell_id,"' class='work_cell_container'>");
        this.html_con.push("<div class='work_glance' style='background-image: url(",this.glance_img_src,")'></div>");
        this.html_con.push("<div class='work_intro'><div class='work_name'>",this.work_name,"</div>");
        this.html_con.push("<div class='work_year'>",this.work_year,"</div></div>");
        this.html_con.push("</div></a>");
        return this.html_con.join("");
    }

    function JournalCell(j_index) {
        this.journal_cell_id = "jc" + j_index;
        this.brf_img_src = "";
        this.j_link_to = "";
        this.journal_title = "";
        this.journal_date = "";
        this.journal_brf = "";
        this.html_con = [];
    }
    JournalCell.prototype.jcHtml = function () {
        this.html_con.push("<a href='",this.j_link_to,"'>");
        this.html_con.push("<div id='",this.journal_cell_id,"' class='journal_cell_container'>");
        this.html_con.push("<div class='journal_glance' style='background-image: url(",this.brf_img_src,")'></div>");
        this.html_con.push("<div class='journal_title'>",this.journal_title,"</div>");
        this.html_con.push("<div class='journal_date'>",this.journal_date,"</div>");
        this.html_con.push("<p class='journal_brf'>",this.journal_brf,"</p>");
        this.html_con.push("</div></a>");
        return this.html_con.join("");
    }

    var work_seg_html = "<div id='work_seg' class='m_seg'><div id='work_inner'></div></div>";
    var journal_seg_html = "<div id='journal_seg' class='m_seg'><div id='journal_inner'></div></div>"

    //Retrieve cell data
    var work_cells_data = [["img/p1.jpg","#","Digital Chinese Bitch Bundle","2013"],["img/p4.jpg","#","Shit O","2013"],["img/p3.jpg","#","CDI Shit 2","2013"],["img/p5.jpg","#","Happy Shit Town","2013"],["img/p2.jpg","#","trims","2012"]]; //temp
    var journal_cells_data = [["img/j_1.png","#","Is Design Thinking Still a Competitive Advantage?","2013-1-1","We’re thrilled to have Sticker Mule on board as a Global Meetup Sponsor in 2016. To celebrate and kick things off they’re offering an incredible deal for Dribbblers."],["img/j_2.jpg","#","Do We Still Need a Instrument Cluster?","2016-4-1","Are there too many screens on our cabin dashboard?"],["img/j_3.png","#","Designing Interface for Simulation Games","2013-1-1","We’re thrilled to have Sticker Mule on board as a Global Meetup Sponsor in 2016. To celebrate and kick things off they’re offering an incredible deal for Dribbblers."],["img/j_4.png","#","Affinity Designer for Mac Hands-on","2015-10-13","(Almost) perfect replacement of Adobe software."],["img/j_5.png","#","Contextual User Interface Enhances Comprehension Effectiveness","2015-10-13","(Almost) perfect replacement of Adobe software."]];

    //Generate nav bar
    var nav_html = [];
    var menu_html = [];
    var nav_area = $("#nav_bar");
    function generateNavHtml() {
        nav_html.push("<div id='fzx' class='nav_items'><a href='index.html'><div id='title'></div><div id='home'>home</div></a></div>");
        nav_html.push("<div id='menu' class='nav_items'>");
        nav_html.push("<a href='#'><div class='menu_items'>work</div></a>");
        nav_html.push("<a href='#'><div class='menu_items'>journal</div></a>");
        nav_html.push("<a href='#'><div class='menu_items'>about</div></a>");
        nav_html.push("</div>");
        nav_html.push("<div id='close_panel'></div>");
        return nav_html.join("");
    }
    nav_area.append(generateNavHtml());//append nav bar
    var m_items = $(".menu_items");
    var close_panel = $("#close_panel");
    var inner_con = $("#content");
    var menu_links = $("#menu");
    m_items.click(showMenu);
    close_panel.click(hideMenu);

    //Generate menu panel
    menu_html.push("<div id='menu_panel' class='hidden'>");
    menu_html.push("<div id='panel_bg'></div><ul>");
    menu_html.push("</ul></div>");
    nav_area.after(menu_html.join(""));//append menu container
    var m_panel = $("#menu_panel");
    m_panel.append(work_seg_html);//append work segment panel
    m_panel.append(journal_seg_html);//append journal segment panel
    var w_seg = $("#work_seg");
    var j_seg = $("#journal_seg");

    //Generate work segment cells
    var work_cell_count = work_cells_data.length;
    var work_cell_objects = [];
    var work_inner_container = $("#work_inner");
    for(i=0;i<work_cell_count;i++){
        work_cell_objects[i] = new WorkCell(i);
        work_cell_objects[i].glance_img_src = work_cells_data[i][0];
        work_cell_objects[i].w_link_to = work_cells_data[i][1];
        work_cell_objects[i].work_name = work_cells_data[i][2];
        work_cell_objects[i].work_year = work_cells_data[i][3];
        work_inner_container.append(work_cell_objects[i].wcHtml());
    }
    //Generate journal segment cells
    var journal_cell_count = journal_cells_data.length;
    var journal_cell_objects = [];
    var journal_inner_container = $("#journal_inner");
    for(k=0;k<journal_cell_count;k++){
        journal_cell_objects[k] = new JournalCell(k);
        journal_cell_objects[k].brf_img_src = journal_cells_data[k][0];
        journal_cell_objects[k].j_link_to = journal_cells_data[k][1];
        journal_cell_objects[k].journal_title = journal_cells_data[k][2];
        journal_cell_objects[k].journal_date = journal_cells_data[k][3];
        journal_cell_objects[k].journal_brf = journal_cells_data[k][4];
        journal_inner_container.append(journal_cell_objects[k].jcHtml());
    }

    //Control
    var should_dark = false;
    function showMenu() {
        //clear menu style
        menu_show = true;
        if(nav_area.hasClass("dark_content")) should_dark = true;
        else should_dark = false;
        nav_area.removeClass();
        m_items.removeClass("m_selected");
        //show menu panel
        m_panel.removeClass("hidden");
        //show blurred bg
        inner_con.css({filter:"blur(10px)","-webkit-filter":"blur(10px)"});
        //move menu bar
        menu_links.addClass("menu_move");
        //show close button
        close_panel.css({transform:"translate(0,0)"});
        //show demanded seg
        $(this).addClass("m_selected");
        if($(this).text()=="work"){
            w_seg.removeClass("hidden");
            j_seg.addClass("hidden");
        }
        else if($(this).text()=="journal"){
            w_seg.addClass("hidden");
            j_seg.removeClass("hidden");
        }
        else if($(this).text()=="about"){
            w_seg.addClass("hidden");
            j_seg.addClass("hidden");
        }
        //log
        console.log("showMenu executed.");
        console.log($(this).text());
    }
    function hideMenu() {
        menu_show = false;
        m_items.removeClass("m_selected");
        if(should_dark) nav_area.addClass("dark_content");
        inner_con.css({filter:"none","-webkit-filter":"none"});
        m_panel.addClass("hidden");
        menu_links.removeClass("menu_move");
        close_panel.css({transform:"translate(80px,0)"});
        console.log("hideMenu executed.");
    }
    w_seg.bind("scroll",function () {
        if((work_inner_container.offset().top)<=78){
            w_seg.css({borderTopColor:"rgba(0,0,0,0.1)"});
        }
        else{
            w_seg.css({borderTopColor:"rgba(0,0,0,0)"});
        }
    });
    j_seg.bind("scroll",function () {
        if((journal_inner_container.offset().top)<=84){
            j_seg.css({borderTopColor:"rgba(0,0,0,0.1)"});
        }
        else{
            j_seg.css({borderTopColor:"rgba(0,0,0,0)"});
        }
    });
});//end jquery ready