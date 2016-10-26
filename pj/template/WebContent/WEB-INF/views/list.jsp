<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<%@ include file="/WEB-INF/views/templete1/test_header.jsp"%>


        <div class="container">


		<div class="N_name">Test Table</div>
		<hr />
		<form:form method="get" modelAttribute="pagination">
			<div class="pull-right">
				<a class="btn btn-write"> <i class="icon-pencil icon-white">
					</i>
					write
				</a>

			</div>

	<input type="hidden" name="pg" value="1" />

			<table class="table table-bordered">
						<colgroup  >
               <col width="13%">
               <col width="40%">
               <col width="17%">
               <col width="17%">
               <col width="13%" />
            </colgroup>
				<thead>
				
						<th class="datacol">번호</th>
						<th class="datacol">제목</th>
						<th class="datacol">작성자</th>
						<th class="datacol">작성일</th>
						<th class="datacol">조회수</th>

	
				</thead>
				<tbody>
					<c:forEach var="b" items="${ list }">
						<tr>
							<td>${ b.idx }</td>
							<td>${ b.title }</td>
							<td>${ b.userid }</td>
							<td><fmt:formatDate pattern="yyyy-MM-dd HH:mm"
									value="${ b.crea_dtm }" /></td>
							<td>${ b.counts}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>

		</form:form>
	</div>

<%@ include file="/WEB-INF/views/templete1/test_footer.jsp"%>
</html>
	