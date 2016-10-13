#!/usr/bin/env python
# -*- coding:utf-8 -*-


def add_node(tree_dic,comment):
    if comment.parent_comment is None:
        #如果是none，是顶层
        tree_dic[comment] = {}
    else:
        # 循环当前整个dict,直到找到为止
        for k,v in tree_dic.items():
            if k == comment.parent_comment: # 找到父评论
                #print("find dad",k)
                tree_dic[comment.parent_comment][comment] = {}
            else: # 进入下一层继续找
                #print("keep going deeper...",v)
                add_node(v,comment)



def build_tree(comment_set):
    '''
    用于生成评论的字典树
    ｛
        1:{
            2:{
                3:{
                    9:{}
                  },
                4:{
                    5:{
                        8:{}
                      },
                    15:{}
                  }
              },
        6:{
            7:{},
            20:{}
        }
    ｝
    '''
    print(comment_set)
    tree_dic = {}

    for comment in comment_set:
        add_node(tree_dic,comment)

    for k,v in tree_dic.items():
        print(k,v)

    return tree_dic


def render_tree_node(tree_dic,margin_val):
    '''
    将字典
    :param tree_dic: 返回的字典树
    :param margin_val: margin初始值
    '''
    html = ""
    for k,v in tree_dic.items():
        #"<span class='glyphicon glyphicon-user' style='margin-left:20px'>%s</span>" %k.user.name + \
        ele = "<div class='root-comment' style='margin-left:%spx'>" %margin_val + k.comment + \
              "<span class='comment-date' style='margin-left:20px'>%s</span>" %k.date + \
              "<span class='comment-name' style='margin-left:20px'>%s</span>" %k.user.name + \
              '<span comment-id="%s"' %k.id +' style="margin-left:20px" class="glyphicon glyphicon-comment add-comment" aria-hidden="true"></span>' + \
              "</div>"
        html += ele
        html += render_tree_node(v,margin_val+50)
    return html


def render_comment_tree(tree_dic):
    html = ""
    for k,v in tree_dic.items():
        #"<span class='glyphicon glyphicon-user' style='margin-left:20px'>%s</span>" %k.user.name + \
        ele = "<div class='root-comment'>" + k.comment + \
              "<span class='comment-date' style='margin-left:20px'>%s</span>" %k.date + \
              "<span class='comment-name' style='margin-left:20px'>%s</span>" %k.user.name + \
              '<span comment-id="%s"' %k.id +' style="margin-left:20px" class="glyphicon glyphicon-comment add-comment comment-answer" aria-hidden="true"></span>' + \
              "</div>"
        html += ele
        html += render_tree_node(v,50)

    return html
