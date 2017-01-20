module Attributes
  extend Nanoc::Int::Memoization

  # Collect all attributes from articles
  #
  # :call-seq:
  #   all_attributes(key, posts) -> array
  #
  # By default all posts are scanned. Add a collection to limit the
  # posts scanned. The items in the array are Nanoc::Items where the
  # +kind+ is +article+
  #
  # Returns an array of strings with the name of attributes on those posts.
  def all_attributes(key, posts=articles)
    attribs = []
    posts.each do |article|
      case article[key]
      when NilClass
        next
      when String
        attribs << article[key]
      when Array
        attribs << article[key].map { |e| e }
      end
    end
    attribs.flatten.compact.sort.uniq
  end
  memoize :all_attributes

  # Find all articles with a specific attribute.
  #
  # :call-seq:
  #   articles_with_attribute(key, attrib, posts) -> array
  #
  # By default all articles are checked. Pass in an array to limit the
  # search to a subset of articles.
  def articles_with_attribute(key, attrib, posts=articles)
    posts.select do |post|
      case post[key]
      when String
        post[key] == attrib
      when Array
        post[key].map{ |e| e }.include? (attrib)
      end
    end
  end
  memoize :articles_with_attribute

  # Collect all articles and return them in sub-arrays by attribute.
  #
  # :call-seq:
  #   articles_by_attribute(key, posts) -> [[attrib, array]]
  #
  # By default all articles are checked. Pass in an array to limit the
  # search to a subset of articles.
  def articles_by_attribute(key, posts=articles)
    attribs = {}
    all_attributes(key).each do |attrib|
      attribs.merge!({attrib => articles_with_attribute(key, attrib)})
    end
    attribs
  end
  memoize :articles_by_attribute

  def link_attribute(key, attrib, post_length=true)
    attribs = articles_by_attribute(key)
    case key
    when :category
      if post_length
        "<a class=\"item\" href=\"/categories/##{attrib}\">#{attrib}<sup>#{attribs[attrib].length}</sup></a>"
      else
        "<a class=\"item\" href=\"/categories/##{attrib}\">#{attrib}</a>"
      end
    when :tags
      if post_length
        "<a class=\"item\" href=\"/tags/##{attrib}\">#{attrib}<sup>#{attribs[attrib].length}</sup></a>"
      else
        "<a class=\"item\" href=\"/tags/##{attrib}\">#{attrib}</a>"
      end
    end
  end

end

include Attributes
