/*
    <%= projectname %>
    version <%= version %>
    by <%=author%>
*/
var <%=projectname%> = function (root) {
    this.root = root;
    this.version = "<%= version %>";

	//your magic
    
    return this;        
};

(function (root) {
    
    root.<%=projectname%> = <%=projectname%>(root);
    
})(window);