"use strict";(self["webpackChunkhybread"]=self["webpackChunkhybread"]||[]).push([[104],{6104:function(e,a,s){s.r(a),s.d(a,{default:function(){return g}});var t=s(6768),o=s(5130),r=s(4232);const l={class:"background"},i={id:"content"},n={id:"form"},p={id:"login"};function d(e,a,s,d,u,c){const m=(0,t.g2)("router-link");return(0,t.uX)(),(0,t.CE)("div",l,[(0,t.Lk)("div",i,[(0,t.Lk)("div",n,[a[11]||(a[11]=(0,t.Lk)("h1",{id:"title"},"Sign Up",-1)),(0,t.Lk)("form",null,[a[7]||(a[7]=(0,t.Lk)("label",{class:"subject",for:"username"},"Username",-1)),(0,t.bo)((0,t.Lk)("input",{class:"input",type:"text",id:"username",name:"username","onUpdate:modelValue":a[0]||(a[0]=e=>u.username=e),placeholder:"ex : pineapplelover",required:""},null,512),[[o.Jo,u.username]]),a[8]||(a[8]=(0,t.Lk)("label",{class:"subject",for:"email"},"Email",-1)),(0,t.bo)((0,t.Lk)("input",{class:"input",type:"email",id:"email",name:"email",placeholder:"ex : pineapple.lover@hybread.com","onUpdate:modelValue":a[1]||(a[1]=e=>u.email=e),required:""},null,512),[[o.Jo,u.email]]),a[9]||(a[9]=(0,t.Lk)("label",{class:"subject",for:"password"},"Password",-1)),(0,t.bo)((0,t.Lk)("input",{class:"input",type:"password",id:"password",name:"password","onUpdate:modelValue":a[2]||(a[2]=e=>u.password=e),placeholder:"ex : PiNeApPlE4l!fe",required:""},null,512),[[o.Jo,u.password]]),a[10]||(a[10]=(0,t.Lk)("label",{class:"subject",for:"repeat-password"},"Confirm Password",-1)),(0,t.bo)((0,t.Lk)("input",{class:"input",type:"password",id:"repeat-password",name:"repeat-password","onUpdate:modelValue":a[3]||(a[3]=e=>u.repeat_password=e),placeholder:"ex : PiNeApPlE4l!fe (again)",required:""},null,512),[[o.Jo,u.repeat_password]]),(0,t.Lk)("button",{onClick:a[4]||(a[4]=(...e)=>c.register&&c.register(...e)),id:"submit",class:"button"},"Sign up"),(0,t.Lk)("p",null,(0,r.v_)(e.message),1),(0,t.Lk)("p",p,[a[6]||(a[6]=(0,t.eW)("You already have an account? ")),(0,t.bF)(m,{to:"/logIn"},{default:(0,t.k6)((()=>a[5]||(a[5]=[(0,t.eW)("Log in")]))),_:1})])])])])])}s(4114);var u={data(){return{username:"",email:"",password:"",repeat_password:""}},beforeRouteEnter(e,a,s){a.path&&localStorage.setItem("previousPage",a.path),s()},methods:{async register(e){e.preventDefault();const a=await fetch("http://localhost:3000/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,email:this.email,password:this.password})});if(a.ok){this.message="User registered successfully";const e=await fetch("http://localhost:3000/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,password:this.password})}),a=await e.json();e.ok?localStorage.setItem("token",a.token):this.message="Login failed",this.$emit("loggedInUpdate");const s="/"===localStorage.getItem("previousPage")||"/login"===localStorage.getItem("previousPage")?"/homepageloggedin":localStorage.getItem("previousPage");this.$router.push(s)}else this.message="User registration failed"}}},c=s(1241);const m=(0,c.A)(u,[["render",d],["__scopeId","data-v-4b066208"]]);var g=m}}]);
//# sourceMappingURL=104.ee57da9b.js.map