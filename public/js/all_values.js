 var color = '#000000';

 var isDown = false;     // ���콺 ��ư�� ������ �� ������

 var point;

var list_click=false;

/**
 * modal���� form�� ���� ������ �� form�� id�� ���� ������ �˷��ֱ� ���� ����
 */
var val_count = 1;		// value form�� count
var select_valcnt = 1;	// value�� select box�� count
var m_count = 1;		// method form�� count
var select_mcnt = 1;	// method�� select box�� count

/**
 * modalâ�� ��� �� �ʿ��� ����
 * (Controller, Service, DAO, MVC�� ����...)
 */
var check_package = "";			// mvc button�߿� � button�� ���� �־����� �����ϱ� ���� ����

/**
 * canvas�� �׸��� ���� �ʿ��� ����.
 */
var xpos = 0;				// ó�� �׸� ��ġ�� x��ǥ
var ypos = 0;				// ó�� �׸� ��ġ�� y��ǥ
var cname_num = 1;			// class�� �̸��� ����.( class�� �̸��� 1���̱� ������ ������ �ʴ´�.)
var val_num = 1;			// ������ ����
var m_num = 1;				// �޼ҵ��� ����
var base_xpos = 150;		// �⺻ ���� ����
var base_ypos = 30;			// �⺻ ���� ����
var width = 0;				// class�� ������ x��ǥ�� ���ϱ� ���� ���� (xpos + base_xpos)
var height = 0;				// class�� ������ y��ǥ�� ���ϱ� ���� ���� (ypos + base_ypos)
var draw_className = "";	// class�� �̸��� �����ϴ� ����
var draw_valueName = [];	// class�� value���� �����ϴ� �迭
var draw_methodName = [];	// class�� method���� �����ϴ� �迭
var draw_select_val = [];	// value�� �ڷ����� �����ϴ� �迭
var draw_select_func = [];	// method�� �������� �����ϴ� �迭
var end_xpos = 0;			// class�� ������ �����ϴ� x��ǥ
var end_ypos = 0;			// class�� ������ �����ϴ� y��ǥ
var conn_point_X = 0;		// �����ϰ� ���� class�� ���� x��ǥ
var conn_point_Y = 0;		// �����ϰ� ���� class�� ���� y��ǥ


/**
 * list�� ������ �����ϱ� ���� ������
 */
var controllerList = [];	// controllser���� �����ϴ� list
var serviceList = [];		// service���� �����ϴ� list
var daoList = [];			// dao���� �����ϴ� list

var controller;		// controller�� element���� ������ ���� ����
var service;		// service�� element���� ������ ���� ����
var dao;			// dao�� element���� ������ ���� ����

//list�� ���� �����ϱ� ���� ����ü
function element(){
	var classname = "";					// class�� �̸��� �����ϱ� ���� element
	var valuename = new Array();		// claee�� value���� �����ϱ� ���� element �迭
	var selectvalue = new Array();		// value�� �ڷ����� �����ϱ� ���� element �迭
	var methodname = new Array();		// claee�� method���� �����ϱ� ���� element �迭
	var selectmethod = new Array();		// method�� ��ȯ���� �����ϱ� ���� element �迭
	var connclassname = "";				// �ش� Ŭ������ �����ϰ� �ִ� class�� name�� �����ϴ� element
	var start_point_x;					// Ŭ������ ���� x��ǥ
	var start_point_y;					// Ŭ������ ���� y��ǥ
	var end_point_x;					// Ŭ������ �� x��ǥ
	var end_point_y;					// Ŭ������ �� y��ǥ
}

// doucment(input �±׵�)�� id�� �������� ���� ��� �Ǵ� ����
var c_name;							// document�� classname�� �ش�Ǵ� input �±��� id�� �޾ƿ� ������ ����
var v_name = new Array();			// document�� valuename�� �ش�Ǵ� input �±��� id�� �޾ƿ� ������ �迭
var m_name = new Array();			// document�� methodname�� �ش�Ǵ� input �±��� id�� �޾ƿ� ������ �迭
var select_val = new Array();		// document�� select box(value)�� ���� �����ϱ� ���� �迭
var	select_func = new Array();		// document�� select box(method)�� ���� �����ϱ� ���� �迭
var connectclass;					// document�� connectclass�� �ش�Ǵ� input �±��� id�� �޾ƿ� ������ ����

var isConn=false;		// �����ϴ��� check
var gubun=-1; //controller�̸� 1, service�� 2, dao�� 3, ������(mvc)�̸� 4, �� �ܿ� 0



// �� List�� count�� ���� ����(�� list�� index��, class�� ������ ������ 1���� �����ϴ� index)
var con_cnt = 0;		// controllerList�� index��
var ser_cnt = 0;		// serviceList�� index��
var dao_cnt = 0;		// daoList�� index��

// Ž������ �Ǵ��ϱ� ���� boolean ����
var check_name = false;			// �ߺ��� üũ�ϱ� ���� boolean�� (false�� �ߺ���)
var conn_con = false;			// connectclass�� ���� ã�� ���� ���� (controllerList�� ���� ������ true)
var conn_ser = false;			// connectclass�� ���� ã�� ���� ���� (serviceList�� ���� ������ true)
var conn_dao = false;			// connectclass�� ���� ã�� ���� ���� (daoList�� ���� ������ true)

var modify_choice = false;		// ���� button�� ���ȴ��� �ƴ��� �Ǵ��ϱ� ���� booleanr��

// Ž������ ã�� index
var conn_index = -1;		// connectclass�� ã���� �� �� index�� �����ϱ� ���� ����
var modify_index = -1;		// ������ �� �� ���� ���� �̸��� ���� class�� ã�� ���� ����
var delete_index = -1;		// ������ �� �� ���� ���� �̸��� ���� class�� ã�� ���� ����

/**
 * ������ �� �� �ʿ��� ������
 */
var modify_class;			// ������ class�� �̸��� �����ϴ� ����

// Ž�� �� ���� ã���� �� � list�� �ִ� ������ �����ϱ� ���� boolean��
var modify_con;				// controllerList���� ã���� ��쿡 ���� ���� boolean��
var modify_ser;				// serviceList���� ã���� ��쿡 ���� ���� boolean��
var modify_dao;				// daoList���� ã���� ��쿡 ���� ���� boolean��
var m_conn_list=[]; //����� class���� ����Ʈ
var m_conn_size=0;

/**
 * ������ �� �� �ʿ��� ������ 
 */
var delete_class;			// ������ class�� �̸��� �����ϴ� ����

//Ž�� �� ���� ã���� �� � list�� �ִ� ������ �����ϱ� ���� boolean��
var delete_con;				// controllerList���� ã���� ��쿡 ���� ���� boolean��
var delete_ser;				// serviceList���� ã���� ��쿡 ���� ���� boolean��
var delete_dao;				// daoList���� ã���� ��쿡 ���� ���� boolean��

var d_conn_list=[]; //����� class���� ����Ʈ
var d_conn_size=0;