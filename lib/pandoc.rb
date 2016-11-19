require 'pandoc-ruby'
require 'json'

# article: Nanoc::ItemWithRepsView
def summary(article)
  pandoc_ext_from = {
    'org'      => :org,
    'md'       => :markdown,
    'markdown' => :markdown
  }

  json_s = PandocRuby.convert(article.raw_content,
                              :from => pandoc_ext_from[article.identifier.ext],
                              :to => :json)
  input_json = JSON.load(json_s)
  input_json["blocks"][0..3].reject! { |elem| elem['t'] == 'Header' }

  return PandocRuby.convert(JSON.dump(input_json),
                            :from => :json,
                            :to => :html5)
end
