# default nanoc helpers
include Nanoc::Helpers::Blogging
include Nanoc::Helpers::LinkTo
include Nanoc::Helpers::Rendering
include Nanoc::Helpers::XMLSitemap

# slim options
require 'slim'
Slim::Engine.options[:pretty] = true

# extend ruby's string
class NilClass
  def titleize
    ""
  end
end

class String
  def upcase?
    match(/\p{Lower}/) == nil
  end

  def titleize
    split(/(\W)/).map { |w| w.upcase? ? w : w.capitalize }.join
  end
end
