# NextJs_Practice
This is the NexJs project.
==========
1. Nextjs giải quyết vấn đề gì ?
+ Render website ở server -> SEO
+ Tối ưu image,font,script, Routing ,Middleware , Server Action, SEO

======== Next Project Structure
+ .Next folder : chứa code khi build 
+ src/app : app router
+ page.tsx : the same with index.js
+ next.config.ts : configuration of next.js
+ postcss.config : 
+ tailwin.config.ts : Sửa content khi muốn thêm đường dẫn cho tailwind hiểu file muốn css 
+ Css: globals.css ; 
    .Thành phần cơ bản của HTML: h1, h2 , thẻ html 
        -> đưa vào @layer base . 
        => Tailwind sẽ biết độ ưu tiên để override lại . sắp xếp trong file global
    . Module: chỉ apply cho component đó thôi
    . SCSS : npm i sass
    . clsx : dùng cho class động 
+ Khi dùng Hooks thì phải 'use client' 


