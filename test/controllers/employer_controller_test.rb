require "test_helper"

class EmployerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get employer_index_url
    assert_response :success
  end

  test "should get create" do
    get employer_create_url
    assert_response :success
  end
end
