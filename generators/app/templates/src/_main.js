/*
    <%= projectname %>
    version <%= version %>
    by <%=author%>
*/
var <%=projectname%> = function (root) {    
    
    this.version = "<%= version %>";
    
    return this;        
};

(function (root) {
    
    root.<%=projectname%> = <%=projectname%>;
    
})(this);