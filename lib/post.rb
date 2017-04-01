include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo

def previous_link
  prev_index = sorted_articles.index(@item) + 1
  prev_article = sorted_articles[prev_index]
  if prev_article.nil?
    link_to("Archive", "/blog", :class => "item", :title => "Archive")
  else
    title = prev_article[:title]
    link_to("Prev", prev_article.path, :class => "item", :title => title)
  end
end

def next_link
  next_index = sorted_articles.index(@item) - 1
  if next_index < 0
    link_to("Archive", "/blog", :class => "item", :title => "Archive")
  else
    post = sorted_articles[next_index]
    title = post[:title]
    link_to("Next", post.path, :class => "item", :title => title)
  end
end
