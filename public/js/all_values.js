 var color = '#000000';

 var isDown = false;     // 마우스 버튼을 눌렀나 안 눌렀나

 var point;

var list_click=false;

/**
 * modal에서 form을 증가 시켜줄 때 form에 id와 폼의 개수를 알려주기 위한 변수
 */
var val_count = 1;		// value form의 count
var select_valcnt = 1;	// value의 select box의 count
var m_count = 1;		// method form의 count
var select_mcnt = 1;	// method의 select box의 count
var vo_valcount = 1;	// vo의 count
var select_vocnt = 1;	// vo의 select box의 count

/**
 * modal창을 띄울 때 필요한 변수
 * (Controller, Service, DAO, MVC로 구분...)
 */
var check_package = "";			// mvc button중에 어떤 button을 눌러 주었는지 구분하기 위한 변수

/**
 * canvas를 그리기 위해 필요한 변수.
 */
var xpos = 0;				// 처음 그릴 위치의 x좌표
var ypos = 0;				// 처음 그릴 위치의 y좌표
var cname_num = 1;			// class의 이름의 개수.( class의 이름은 1개이기 때문에 변하지 않는다.)
var val_num = 1;			// 변수의 개수
var m_num = 1;				// 메소드의 개수
var base_xpos = 150;		// 기본 가로 길이
var base_ypos = 30;			// 기본 세로 길이
var width = 0;				// class의 끝점의 x좌표를 구하기 위한 변수 (xpos + base_xpos)
var height = 0;				// class의 끝점의 y좌표를 구하기 위한 변수 (ypos + base_ypos)
var draw_className = "";	// class의 이름을 저장하는 변수
var draw_valueName = [];	// class의 value들을 저장하는 배열
var draw_methodName = [];	// class의 method들을 저장하는 배열
var draw_select_val = [];	// value의 자료형을 저장하는 배열
var draw_select_func = [];	// method의 리턴형을 저장하는 배열
var end_xpos = 0;			// class의 끝점을 저장하는 x좌표
var end_ypos = 0;			// class의 끝점을 저장하는 y좌표
var conn_point_X = 0;		// 연결하고 싶은 class의 끝점 x좌표
var conn_point_Y = 0;		// 연결하고 싶은 class의 끝점 y좌표


/**
 * list에 정보를 저장하기 위한 변수들
 */
var controllerList = [];	// controllser들을 저장하는 list
var serviceList = [];		// service들을 저장하는 list
var daoList = [];			// dao들을 저장하는 list
var voList = [];			// vo를 저장하는 list

//list에 값을 저장하기 위한 구조체
function element(){
	var classname = "";					// class의 이름을 저장하기 위한 element
	var valuename = new Array();		// claee의 value들을 저장하기 위한 element 배열
	var selectvalue = new Array();		// value의 자료형을 저장하기 위한 element 배열
	var methodname = new Array();		// claee의 method들을 저장하기 위한 element 배열
	var selectmethod = new Array();		// method의 반환형을 저장하기 위한 element 배열
	var connclassname = "";				// 해당 클래스가 연결하고 있는 class의 name을 저장하는 element
	var start_point_x;					// 클래스의 시작 x좌표
	var start_point_y;					// 클래스의 시작 y좌표
	var end_point_x;					// 클래스의 끝 x좌표
	var end_point_y;					// 클래스의 끝 y좌표
}

function vo_element(){
	var classname = "";					// class의 이름을 저장하기 위한 element
	var valuename = new Array();			// claee의 value들을 저장하기 위한 element 배열
	var selectvalue = new Array();		// value의 자료형을 저장하기 위한 element 배열
}

var controller=new element();		// controller의 element들을 모으기 위한 변수
var service=new element();		// service의 element들을 모으기 위한 변수
var dao=new element();			// dao의 element들을 모으기 위한 변수
var vo=new vo_element();				// vo의 element들을 저장하기 위한 변수


// doucment(input 태그들)의 id를 가져오기 위해 사용 되는 변수
var c_name;							// document의 classname에 해당되는 input 태그의 id를 받아와 저장할 변수
var v_name = new Array();			// document의 valuename에 해당되는 input 태그의 id를 받아와 저장할 배열
var m_name = new Array();			// document의 methodname에 해당되는 input 태그의 id를 받아와 저장할 배열
var select_val = new Array();		// document의 select box(value)의 값을 저장하기 위한 배열
var	select_func = new Array();		// document의 select box(method)의 값을 저장하기 위한 배열
var connectclass;					// document의 connectclass에 해당되는 input 태그의 id를 받아와 저장할 변수

var isConn=false;		// 연결하는지 check
var gubun=-1; //controller이면 1, service면 2, dao면 3, 세개다(mvc)이면 4, 그 외에 0



// 각 List의 count를 세줄 변수(즉 list의 index값, class를 생성할 떄마다 1개씩 증가하는 index)
var con_cnt = 0;		// controllerList의 index값
var ser_cnt = 0;		// serviceList의 index값
var dao_cnt = 0;		// daoList의 index값
var vo_cnt = 0;			// voList의 index값

// 탐색등을 판단하기 위한 boolean 값들
var check_name = false;			// 중복을 체크하기 위한 boolean값 (false면 중복됨)
var conn_con = false;			// connectclass의 값을 찾기 위한 변수 (controllerList에 값이 있으면 true)
var conn_ser = false;			// connectclass의 값을 찾기 위한 변수 (serviceList에 값이 있으면 true)
var conn_dao = false;			// connectclass의 값을 찾기 위한 변수 (daoList에 값이 있으면 true)

var modify_choice = false;		// 수정 button이 눌렸는지 아닌지 판단하기 위한 booleanr값

// 탐색에서 찾은 index
var conn_index = -1;		// connectclass를 찾았을 때 그 index를 저장하기 위한 변수
var modify_index = -1;		// 수정할 때 그 누른 값과 이름이 같은 class를 찾기 위한 변수
var delete_index = -1;		// 삭제할 때 그 누른 값과 이름이 같은 class를 찾기 위한 변수
var modify_vo_index = -1;	// vo를 수정할 때 그 누른 값과 이름이 같은 class를 찾기 위한 변수
var delete_vo_index = -1;	// vo를 삭제할 때 그 누른 값과 이름이 같은 class를 찾기 위한 변수

/**
 * 수정을 할 때 필요한 변수들
 */
var modify_class;			// 수정할 class의 이름을 저장하는 변수
var modify_vo_class;		// 수정할 vo의 이름을 저장하는 변수

// 탐색 후 값을 찾았을 떄 어떤 list에 있는 값인지 구분하기 위한 boolean값
var modify_con;				// controllerList에서 찾았을 경우에 쓰기 위한 boolean값
var modify_ser;				// serviceList에서 찾았을 경우에 쓰기 위한 boolean값
var modify_dao;				// daoList에서 찾았을 경우에 쓰기 위한 boolean값
var m_conn_list=[]; //연결된 class들의 리스트
var m_conn_size=0;

var modify_vo;					// voList에서 찾았을 경우에 쓰기 위한 boolean값

var modify_choice = false;		// 수정인지 아니면 생성인지 확인하기 위한 변수
var modify_vo_choice = false;	// vo에 대해서 수정인지 아니면 생성인지 확인하기 위한 변수


/**
 * 삭제를 할 때 필요한 변수들 
 */
var delete_class;			// 삭제할 class의 이름을 저장하는 변수
var delete_vo_class;		// 삭제할 vo의 이름을 저장하는 변수

//탐색 후 값을 찾았을 떄 어떤 list에 있는 값인지 구분하기 위한 boolean값
var delete_con;				// controllerList에서 찾았을 경우에 쓰기 위한 boolean값
var delete_ser;				// serviceList에서 찾았을 경우에 쓰기 위한 boolean값
var delete_dao;				// daoList에서 찾았을 경우에 쓰기 위한 boolean값
var delete_vo;				// voList에서 찾았을 경우에 쓰기 위한 boolean값

var d_conn_list=[]; //연결된 class들의 리스트
var d_conn_size=0;


/**
 * canvas를 움직이기 위해 사용되는 변수들.
 */
var sx;					// 시작하는 x좌표를 의미...(옯길 때 마우스가 찍은 위치...)
var sy;					// 시작하는 y좌표를 의미...(옯길 떄 마우스가 찍은 위치...)
var moving;				// 이동 중인 도형의 index.
var move_con;			// controllerList에서 움직이는 물체를 찾았을 때 사용 하기 위한 boolean값
var move_ser;			// serviceList에서 움직이는 물체를 찾았을 때 사용 하기 위한 boolean값
var move_dao;			// daoList에서 움직이는 물체를 찾았을 때 사용 하기 위한 boolean값
var drawing = false;	// true면 움직인 좌표를 토대로 계속 그림을 그림
var ex;					// 끝 x좌표를 의미...(마우스가 옮겨진 위치...)
var ey;					// 끝 y좌표를 의미...(마우스가 옮겨진 위치...)


/**
 * DB에 설정할 ID, PW, PORT, SID를 설정해주기 위한 변수
 */
var db=new db_element();
db.dbid='';
db.dbpw='';
db.dbport='';
db.dbsid='';
function db_element(){
	var dbid='';
	var dbpw='';
	var dbport='';
	var dbsid='';
}
function All_Init(){
	ValuesInit();
	ModifyInit();
	DeleteInit();
	ModifyVOInit();
	DeleteVOInit();
	DrawInit();
	FormInit();
}