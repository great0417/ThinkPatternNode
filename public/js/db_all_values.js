/**
 * 모든 변수들을 저장한 js file
 */



var list_click_db = false;			// '+' button이 눌렀을 경우 create modal이 뜨도록 만들기 위한 boolean값

var tableList = new Array();	// 만든 table을 저장하기 위한 list 배열
var table;						// db의 속성들을 저장할 구조체 변수
var table_cnt = 0;				// table의 index를 표시하기 위한 변수

function db_element(){
	var tablename = "";					// table의 이름을 저장하기 위한 element
	var columnname = new Array();		// table의 column들을 저장하기 위한 element 배열
	var datatype = new Array();			// column의 data type을 저장하기 위한 element 배열
	var directtype = new Array();		// 직접입력한 data type을 저장하기 위한 element 배열
	var conn_dao="";			//연결한 dao
	var start_point_dbx;					// table의 시작 x좌표
	var start_point_dby;					// table의 시작 y좌표
	var end_point_dbx;					// table의 끝 x좌표
	var end_point_dby;					// table의 끝 y좌표
}

// table들을 그리기 위해서 필요한 변수들.
var db_xpos = 0;							// canvas를 그릴 때 처음 시작점의 x좌표를 의미하는 변수
var db_ypos = 0;							// canvas를 그릴 때 처음 시작점의 y좌표를 의미하는 변수
var base_db_xpos = 150;						// 기본 가로 길이
var base_db_ypos = 30;						// 기본 세로 길이
var tname_num = 1;							// 그릴 table의 이름의 개수.(table의 이름은 1개이기 때문에 무조건 1로 고정)
var comn_num = 1;							// 그릴 table의 column의 개수를 저장하는 변수
var draw_tableName = "";					// canvas에 그려서 표시해줄 table의 이름을 저장하는 변수
var draw_columnName = new Array();			// column의 이름을 저장할 배열
var draw_dataType = new Array();			// column의 data type을 저장할 배열
var draw_direct_type = new Array();			// column의 data type이 직접입력일 경우 직접입력한 값을 저장하기 위한 배열
var draw_conn_dao='';
var end_db_xpos = 0;						// table의 끝점을 저장하는 x좌표
var end_db_ypos = 0;						// table의 끝점을 저장하는 y좌표

var db_width = 0;							
var db_height = 0;

// column을 위한 태그에 사용할 변수
var comn_count = 1;				// column을 위한 input box의 id를 다르게 하기 위해서 사용할 변수
var select_comncnt = 1;			// column을 위한 select box의 id를 다르게 하기 위해서 사용할 변수
var dicomn_cnt = 1;				// column을 위한 직접입력 input box에 사용할 변수

// modal에서 사용하는 변수들
var t_name = "";				// table의 name을 저장할 임시 변수
var column_name = [];			// table의 column명을 저장하는 임시 배열
var select_type = [];			// column의 data type을 저장하는 임시 배열
var direct_type = [];			// column의 data type의 value를 직접입력을 선택할경우 사용할 임시 배열
var check_tname = false;		// table의 이름이 중복되었는지 체크하기 위한 변수

// 데이터를 수정하기 위한 변수
var modify_dbchoice = false;		// 수정인지 아닌지 판단하기 위한 boolean값
var modify_table = "";				// 수정할 table이 이름을 저장하는 변수
var modify_dbindex = -1;			// 수정할 table의 이름의 list index값으로 사용할 변수
var modify_db = false;				// 수정할 table을 찾았을 경우 알려주기 위한 boolean값

// 데이터를 삭제하기 위한 변수
var delete_table = "";			// 삭제할 table의 이름을 저장하기 위한 변수
var delete_dbindex = -1;		// 삭제할 table 이름의 list index값으로 사용할 변수
var delete_db = false;			// 삭제할 table을 찾았을 경우 알려주기 위한 boolean값

// 그림을 이동하는 mouse event를 처리할 때 필요한 변수
var move_table = false;					// 움직일 table을 찾았을 경우 이를 알려주기 위한 boolean값
var table_moving = -1;						// 이동 중인 도형의 index.
var db_sx;									// 시작하는 x좌표를 의미...(옯길 때 마우스가 찍은 위치...)
var db_sy;									// 시작하는 y좌표를 의미...(옯길 떄 마우스가 찍은 위치...)
var db_ex;									// 끝 x좌표를 의미...(마우스가 옮겨진 위치...)
var db_ey;									// 끝 y좌표를 의미...(마우스가 옮겨진 위치...)

function DB_All_Init(){
	DBValuesInit();
	ModifyDBInit();
	DeleteDBInit();
	DrawDBInit();
	FormDBInit();
	DBMouseEventInit();
}
