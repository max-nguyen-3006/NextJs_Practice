# NextJs_Practice
** This is the NexJs project. **  
==========
<ins> 1. Nextjs giải quyết vấn đề gì ? </ins>
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
+ Khi dùng Hooks thì phải 'use client' , event- listener : onClick, use window.cookie, window.location:<- api from brower
+ Routing : 
    . Link (a tag) : recommend
    . useRouter : work with CR
    . redirect (not work in event-handler (handleClick())) : work with both CR,SR 
+ Rendering: Hybrid , Network Boundary , default : all components will rendered html when nextjs build.
    . Client Component:  default (but user can't not react with DOM ) -> render again CC to sync with DOM, event ,
         state, effect: 2 times   rende r: build + 1 time at client ( React Server Component Payload)
        ==> SEO not good 
 
    . Server Component : Default when creating , cache, allow private data, streaming , SEO , Reduce Bundersize
+ LifeCycle of Next Js : 
==== The first time , you access the nextjs website : F5,
    1. Server + Client -> Render Html 
    2. Client see website right away but not react with it ( click , hover)
    3. Load JS bunder  ( contains React Server Component Payload) to re-render component at client . update DOM
    4. Finally, Adding events into client componentto react with users : Called Hydration
==== The second time : Navigate between pages : Example ; /Home -> /About
    1. Server does not return HTML , it will return RSC Payload , css, js 
    2 Client render HTML automatically .
+ Process.env : client : will be object empty 

# Quản lý Auth trong Next.js

1. Next Auth: suitble for Be and FE both are NextJs
2. Authentication qua cookie -> vừa check được Auth thông qua Authoziration Bearer vừa check đưuọc ở cookie
  + Create Next Server Api : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
  + Get data from cookie from server : 
Note: dùng api của server nextjs để set cookie là vì nó có thể set httponly.
        -> nếu client set cookie thì ko thể set httponly
3. Add Middleware : should be checked at Nextjs Server.
