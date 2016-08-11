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
  output_json = []
  output_json.push input_json[0]
  output_json.push input_json[1][0..3].reject { |elem| elem['t'] == 'Header' }

  return PandocRuby.convert(JSON.dump(output_json),
                            :from => :json,
                            :to => :html5)
end
