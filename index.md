---
layout: page
title: 酷剑博客
tagline: 关注前端开发，HTML5和CSS3等领域
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date:"%Y-%m-%d" }}</span> <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>




